import { useEffect, useRef, useState } from "react";
import LoadingButton from "./loadingButton";
import callManager from "../../hooks/callManager";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
const Login = () => {
  const { call, loading } = callManager();
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
    reRef.current?.reset();
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
        <ReCAPTCHA
          sitekey={SITE_KEY}
          ref={reRef}
          onChange={handleCaptchaChange}
        />
        <LoadingButton loading={loading}>ورود</LoadingButton>
      </form>
      <Link to="/pass-restore">بازیابی رمز عبور</Link>
      <br />
      <Link to={"/auth/register"}>حساب کاربری ندارید ؟ ثبت نام کنید .</Link>
    </div>
  );
};
export default Login;
