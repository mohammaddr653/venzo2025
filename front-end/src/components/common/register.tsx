import { useState } from "react";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../helpers/callManager";

interface RegisterArguments {
  isAdmin?: boolean;
}

const Register: React.FC<RegisterArguments> = ({ isAdmin = false }) => {
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = isAdmin
      ? await call(
          axios.post(SERVER_API + "/admin/dashboard/users", formData),
          true
        )
      : await call(
          axios.post(SERVER_API + "/auth/register", formData),
          true,
          "/auth/login"
        );
  };

  return (
    <div>
      <h1>ثبت نام</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="border"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="border"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          className="border"
          onChange={handleChange}
        />
        <LoadingButton loading={loading}>ثبت نام</LoadingButton>
      </form>
    </div>
  );
};
export default Register;
