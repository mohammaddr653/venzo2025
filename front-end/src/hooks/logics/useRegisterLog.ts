import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";
import { useRef, useState } from "react";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

const useRegisterLog = () => {
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });
  const reRef = useRef<ReCAPTCHA | null>(null);

  const handleCaptchaChange = (value: any) => {
    setFormData({ ...formData, token: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/auth/register", formData),
      true,
      "/auth/login"
    );
    reRef.current?.reset();
  };

  return { handleSubmit, handleChange, reRef, handleCaptchaChange, loading };
};

export default useRegisterLog;
