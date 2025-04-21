import { useState } from "react";
import { AxiosMessageType } from "../../types/objects/axiosMessageProps";
import AxiosMessage from "../../components/common/axiosMessage";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../helpers/createUser";
import { Toaster } from "sonner";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { SERVER_URL } from "../../../config";
import callManager from "../../helpers/calls/callManager";

interface RegisterArguments {
  isAdmin?: boolean;
}

const Register: React.FC<RegisterArguments> = ({ isAdmin = false }) => {
  const { call, loading } = callManager();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [axiosMsgs, setAxiosMsgs] = useState<AxiosMessageType[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = isAdmin
      ? createUser(formData)
      : call(
          axios.post(SERVER_URL + "/auth/register", formData),
          "/auth/login"
        );
  };

  return (
    <div>
      <Toaster position="top-right" />
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
        <LoadingButton loading={loading}></LoadingButton>
      </form>
    </div>
  );
};
export default Register;
