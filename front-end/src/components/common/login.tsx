import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosMessageType } from "../../types/objects/axiosMessageProps";
import AxiosMessage from "../../components/common/axiosMessage";
import { login } from "../../helpers/login";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    try {
      const response = await login(formData);
      navigate("/");
    } catch (error: any) {
      setAxiosMsgs([...axiosMsgs, error]);
    }
  };

  return (
    <div>
      {axiosMsgs.length ? (
        <AxiosMessage msg={axiosMsgs[axiosMsgs.length - 1]}></AxiosMessage>
      ) : null}
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default Login;
