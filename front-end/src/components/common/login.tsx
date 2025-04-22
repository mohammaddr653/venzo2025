import { useState } from "react";
import LoadingButton from "./loadingButton";
import callManager from "../../helpers/calls/callManager";
import axios from "axios";
import { SERVER_URL } from "../../../config";

const Login = () => {
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
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
    const response=await call(axios.post(SERVER_URL + "/auth/login", formData),false, "/");
  };

  return (
    <div>
      <h1>ورود</h1>
      <form onSubmit={handleSubmit}>
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
        <LoadingButton loading={loading}>ورود</LoadingButton>
      </form>
    </div>
  );
};
export default Login;
