import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";
import { useRef, useState } from "react";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import useLoadUser from "../useLoadUser";

const useLoginLog = () => {
  const { call, loading } = callManager();
  const { getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });
  const reRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value: any) => {
    setFormData({ ...formData, token: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/auth/login", formData),
      true,
      "/"
    );
    getAuthedUser(); //if token exist , set the user
    reRef.current?.reset();
  };

  return { handleSubmit, handleChange, reRef, handleCaptchaChange, loading };
};

export default useLoginLog;
