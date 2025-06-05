import axios from "axios";
import { useUserStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import callManager from "../../hooks/callManager";
import { useLocation } from "react-router-dom";
import { SERVER_API } from "../../../config";
import LoadingButton from "../../components/common/loadingButton";

const OnePropertyPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
  });
  const { state } = useLocation();
  const { propertyId } = state || null;

  async function loadOneProperty() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/properties/${propertyId}`),
      false
    );
    const matchedProperty = response.data.data;
    setFormData({
      ...formData,
      name: matchedProperty.name,
    });
  }

  useEffect(() => {
    loadOneProperty();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/properties/${propertyId}`,
        formData
      ),
      true
    );
    loadOneProperty();
  };
  return (
    <div>
      <h1>صفحه ویرایش ویژگی</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <LoadingButton loading={loading}>بروزرسانی</LoadingButton>
        </form>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default OnePropertyPage;
