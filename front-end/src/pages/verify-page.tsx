import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "../helpers/callManager";
import { useUserStore } from "../store";
import { useEffect, useState } from "react";
import LoadingButton from "../components/common/loadingButton";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
    code: "",
  });
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
      axios.post(SERVER_API + "/verify", formData),
      true,
      "/verify"
    );
  };

  useEffect(() => {
    sendCode();
  }, []);

  async function sendCode() {
    const response = await call(axios.get(SERVER_API + "/verify"), false);
  }

  return (
    <div>
      <h1>verify page</h1>
      <p>برای استفاده از امکانات حساب کاربری لطفا ایمیل خود را تایید کنید</p>
      <p>
        <span>ما به</span>
        <span>{user?.email}</span>
        <span>
          ایمیلی فرستادیم . لطفا آن را تایید کنید سپس صفحه را مجددا بلرگزاری
          کنید
        </span>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          className="border"
          onChange={handleChange}
        />
        <LoadingButton loading={loading}>تایید</LoadingButton>
      </form>

      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default VerifyPage;
