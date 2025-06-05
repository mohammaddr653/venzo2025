import axios from "axios";
import { useUserStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import callManager from "../../hooks/callManager";
import { useLocation } from "react-router-dom";
import { SERVER_API } from "../../../config";
import LoadingButton from "../../components/common/loadingButton";

const OnePropertyvalPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    value: "",
  });
  const { state } = useLocation();
  const { propertyvalId } = state || null;

  async function loadOnePropertyval() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`),
      false
    );
    const matchedProperty = response.data.data;
    setFormData({
      ...formData,
      value: matchedProperty.value,
    });
  }

  useEffect(() => {
    loadOnePropertyval();
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
        SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`,
        formData
      ),
      true
    );
    loadOnePropertyval();
  };
  return (
    <div>
      <h1>صفحه ویرایش مقدار ویژگی</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="value"
            name="value"
            value={formData?.value}
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
export default OnePropertyvalPage;
