import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/common/loadingButton";
import { useUserStore } from "../../store";
import callManager from "../../helpers/callManager";
import { useEffect, useRef, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";

const PropertiesPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [properties, setProperties] = useState<any>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    specifiedVals: "true",
  });

  async function loadProperties() {
    setFormData({
      name: "",
      specifiedVals: "true",
    });
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/properties"),
      false
    );
    setProperties([...response.data.data]);
  }

  useEffect(() => {
    loadProperties();
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
    propertyId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/properties/${propertyId}`),
      true
    );
    loadProperties();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyId: any
  ) => {
    navigate("/admin/update-property", { state: { propertyId } });
  };

  const handleManagment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyId: any,
    propertyName: any
  ) => {
    navigate("/admin/propertyvals", { state: { propertyId, propertyName } });
  };

  const handleRefresh = () => {
    loadProperties();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/properties", formData),
      true
    );
    loadProperties();
  };

  return (
    <div>
      <h1>مدیریت ویژگی ها</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            className="border"
            onChange={handleChange}
          />
          <br />
          <label>
            <input
              type="radio"
              name="specifiedVals"
              value="true"
              checked={formData.specifiedVals === "true" ? true : false}
              onChange={handleChange}
            />
            مقادیر مشخص
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="specifiedVals"
              value="false"
              checked={formData.specifiedVals === "false" ? true : false}
              onChange={handleChange}
            />
            مقادیر متغیر
          </label>
          <br />
          <LoadingButton loading={loading}>افزودن ویژگی</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of properties</caption>
          <thead>
            <tr>
              <th className="border">نام ویژگی</th>
              <th className="border">عملیات</th>
              <th className="border">پیکره بندی</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">{property.name}</td>
                  <td className="border">
                    <button
                      onClick={(e, propertyId = property._id) => {
                        handleDelete(e, propertyId);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={(e, propertyId = property._id) => {
                        handleUpdate(e, propertyId);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td className="border">
                    {property.specifiedVals ? (
                      <button
                        onClick={(e, propertyId = property._id) => {
                          handleManagment(e, propertyId, property.name);
                        }}
                      >
                        مدیریت پیکره بندی
                      </button>
                    ) : null}
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
export default PropertiesPage;
