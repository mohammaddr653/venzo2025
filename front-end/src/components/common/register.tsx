import { useState } from "react";
import { AxiosMessageType } from "../../types/objects/axiosMessageProps";
import AxiosMessage from "../../components/common/axiosMessage";
import { register } from "../../helpers/register";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../helpers/createUser";

interface RegisterArguments {
  isAdmin?: boolean;
}

const Register: React.FC<RegisterArguments> = ({ isAdmin = false }) => {
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
    try {
      const response = isAdmin
        ? await createUser(formData)
        : await register(formData);
      isAdmin ? setAxiosMsgs([...axiosMsgs, response]) : navigate("/auth/login");
    } catch (error: any) {
      setAxiosMsgs([...axiosMsgs, error]);
    }
  };

  return (
    <div>
      {axiosMsgs.length ? (
        <AxiosMessage msg={axiosMsgs[axiosMsgs.length - 1]}></AxiosMessage>
      ) : null}
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default Register;
