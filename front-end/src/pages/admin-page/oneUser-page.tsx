import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import { seeOneUser } from "../../helpers/seeOneUser";
import { AxiosMessageType } from "../../types/objects/axiosMessageProps";
import { useLocation } from "react-router-dom";
import AxiosMessage from "../../components/common/axiosMessage";
import { updateUser } from "../../helpers/updateUser";

const OneUserPage = () => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [axiosMsgs, setAxiosMsgs] = useState<AxiosMessageType[]>([]);
  const { state } = useLocation();
  const { userId } = state || null;

  async function loadOneUser() {
    try {
      const response = await seeOneUser(userId);
      const matchedUser = response.data.data;
      setFormData({
        ...formData,
        name: matchedUser.name,
        email: matchedUser.email,
      });
    } catch (error: any) {
      setAxiosMsgs([...axiosMsgs, error]);
    }
  }
  useEffect(() => {
    loadOneUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUser(userId, formData);
      setAxiosMsgs([...axiosMsgs, response]);
    } catch (error: any) {
      setAxiosMsgs([...axiosMsgs, error]);
    }
  };

  return (
    <div>
      {axiosMsgs.length ? (
        <AxiosMessage msg={axiosMsgs[axiosMsgs.length - 1]}></AxiosMessage>
      ) : null}
      <h1>مشاهده یک کاربر</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3"
            placeholder="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <button className="border rounded p-3 bg-lime-500 text-white [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)]">
            بروزرسانی
          </button>
        </form>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default OneUserPage;
