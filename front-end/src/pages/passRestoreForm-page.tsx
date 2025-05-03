import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "../helpers/callManager";
import { useUserStore } from "../store";
import { useState } from "react";
import LoadingButton from "../components/common/loadingButton";
import { useParams } from "react-router-dom";

const PassRestoreFormPage = () => {
  const { token } = useParams();
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
    password: "",
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
      axios.post(SERVER_API + `/pass-restore/${token}`, formData),
      true,
      "/auth/login"
    );
  };

  return (
    <div>
      <h1>بازیابی رمز عبور</h1>
      <p>لطفا رمز مورد نظر خود را وارد کنید</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="password"
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
export default PassRestoreFormPage;
