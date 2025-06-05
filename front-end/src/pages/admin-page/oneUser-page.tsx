import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../hooks/callManager";
import LoadingButton from "../../components/common/loadingButton";

const OneUserPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { state } = useLocation();
  const { userId } = state || null;

  async function loadOneUser() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/users/${userId}`),
      false
    );
    const matchedUser = response.data.data;
    setFormData({
      ...formData,
      name: matchedUser.name,
      email: matchedUser.email,
    });
  }
  useEffect(() => {
    loadOneUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/admin/dashboard/users/${userId}`, formData),
      true
    );
  };

  return (
    <div>
      <h1>مشاهده یک کاربر</h1>
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
          <input
            type="text"
            className="border rounded p-3"
            placeholder="email"
            name="email"
            value={formData?.email}
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
export default OneUserPage;
