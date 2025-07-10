import { useRef, useState } from "react";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../config";
import callManager from "../../hooks/callManager";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import useRegisterLog from "../../hooks/logics/useRegisterLog";

const Register = () => {
  const { handleSubmit, handleChange, reRef, handleCaptchaChange, loading } =
    useRegisterLog();

  return (
    <div className="flex flex-col gap-3 bg-white border p-4 py-5 rounded-md border-neutral-300 w-fit">
      <h1 className="w-full mb-3 font-weight300 text-neutral-800 text-size17">
        ساخت حساب کاربری
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="نام"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="ایمیل"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="رمز عبور"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
        <ReCAPTCHA
          sitekey={SITE_KEY}
          ref={reRef}
          onChange={handleCaptchaChange}
        />
        <LoadingButton loading={loading}>ثبت نام</LoadingButton>
      </form>
      <br />
      <Link to={"/auth/login"}>قبلا ثبت نام کرده اید ؟ وارد شوید .</Link>
    </div>
  );
};
export default Register;
