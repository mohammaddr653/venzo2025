import { useEffect, useRef, useState } from "react";
import callManager from "../hooks/callManager";
import { DEFAULT_AVATAR, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";
import LoadingButton from "../components/common/loadingButton";
import useLoadUser from "../hooks/useLoadUser";
import AvatarSelector from "../components/common/avatarSelector";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { call, loading } = callManager();
  const { user, userLoading, getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    name: "",
  });

  function refresh() {
    setFormData({
      name: user ? user.name : "",
    });
  }

  useEffect(() => {
    refresh();
  }, [user]);

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
      axios.put(SERVER_API + "/user/dashboard", formData),
      true
    );
    getAuthedUser();
  };
  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.isadmin ? "is admin" : "not admin"}</h1>
      <h1>user page</h1>
      <AvatarSelector user={user}></AvatarSelector>
      <div className="bg-green-300">
        <h1>ویرایش اکانت</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            className="border"
            onChange={handleChange}
          />
          <br />
          <LoadingButton loading={loading}>ثبت تغییرات</LoadingButton>
        </form>
      </div>
      <Link to={"/orders"}>سفارش های من</Link>

      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default UserPage;
