import { useEffect, useRef, useState } from "react";
import LoadingButton from "./loadingButton";
import callManager from "../../hooks/callManager";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import useLoginLog from "../../hooks/logics/useLoginLog";
const Login = () => {
  const { handleSubmit, handleChange, reRef, handleCaptchaChange, loading } =
    useLoginLog();

  return (
    <div className="flex flex-col gap-3 bg-white border p-4 py-5 rounded-md border-neutral-300 w-fit">
      <h1 className="w-full mb-3 font-weight300 text-neutral-800 text-size17">
        وارد شوید
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <LoadingButton loading={loading}>ورود</LoadingButton>
      </form>
      <Link to="/pass-restore" className="text-size14">بازیابی رمز عبور</Link>
      <Link to={"/auth/register"} className="text-size14">حساب کاربری ندارید ؟ ثبت نام کنید .</Link>
    </div>
  );
};
export default Login;
