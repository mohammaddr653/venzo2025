import { useRef, useState } from "react";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../config";
import callManager from "../../hooks/callManager";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

interface RegisterArguments {
  isAdmin?: boolean;
}

const Register: React.FC<RegisterArguments> = ({ isAdmin = false }) => {
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
    reRef.current?.reset();
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
        {isAdmin ? null : (
          <ReCAPTCHA
            sitekey={SITE_KEY}
            ref={reRef}
            onChange={handleCaptchaChange}
          />
        )}
        <LoadingButton loading={loading}>ثبت نام</LoadingButton>
      </form>
      {isAdmin ? null : (
        <>
          <br />
          <Link to={"/auth/login"}>قبلا ثبت نام کرده اید ؟ وارد شوید .</Link>
        </>
      )}
    </div>
  );
};
export default Register;
