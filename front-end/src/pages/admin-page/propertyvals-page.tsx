import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "../../components/common/loadingButton";
import { useUserStore } from "../../store";
import callManager from "../../hooks/callManager";
import { useEffect, useRef, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";

const PropertyvalsPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [propertyvals, setPropertyvals] = useState<any>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { propertyId, propertyName } = state || null;
  const [formData, setFormData] = useState({
    propertyId: propertyId,
    value: "",
  });

  async function loadPropertyvals() {
    setFormData({
      propertyId: propertyId,
      value: "",
    });
    const response = await call(
      axios.get(
        SERVER_API + `/admin/dashboard/propertyvals/filter/${propertyId}`
      ),
      false
    );
    setPropertyvals([...response.data.data]);
  }

  useEffect(() => {
    loadPropertyvals();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyvalId: any
  ) => {
    const response = await call(
      axios.delete(
        SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`
      ),
      true
    );
    loadPropertyvals();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyvalId: any
  ) => {
    navigate("/admin/update-propertyval", { state: { propertyvalId } });
  };

  const handleRefresh = () => {
    loadPropertyvals();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/propertyvals", formData),
      true
    );
    loadPropertyvals();
  };

  return (
    <div>
      <h1>مدیریت مقدار های {propertyName}</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="text"
            placeholder="value"
            name="value"
            value={formData.value}
            className="border"
            onChange={handleChange}
          />
          <br />
          <LoadingButton loading={loading}>افزودن مقدار ویژگی</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of properties</caption>
          <thead>
            <tr>
              <th className="border">مقدار ویژگی</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {propertyvals?.map((propertyval: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">{propertyval.value}</td>
                  <td className="border">
                    <button
                      onClick={(e, propertyvalId = propertyval._id) => {
                        handleDelete(e, propertyvalId);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={(e, propertyvalId = propertyval._id) => {
                        handleUpdate(e, propertyvalId);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default PropertyvalsPage;
