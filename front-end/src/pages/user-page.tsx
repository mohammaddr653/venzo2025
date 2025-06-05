import { useEffect, useRef, useState } from "react";
import callManager from "../hooks/callManager";
import { DEFAULT_AVATAR, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";
import LoadingButton from "../components/common/loadingButton";
import useLoadUser from "../hooks/useLoadUser";

const UserPage = () => {
  const { call, loading } = callManager();
  const { user, userLoading, getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });
  const fileInputRef = useRef<any>(null);

  function refresh() {
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormData({
      name: user ? user.name : "",
      avatar: "",
    });
  }

  useEffect(() => {
    refresh();
  }, [user]);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, avatar: event.target.files[0] });
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    const response = await call(
      axios.put(SERVER_API + "/user/dashboard", dataToSend),
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
      <img
        src={user?.avatar ? SERVER_URL + user.avatar : DEFAULT_AVATAR}
        alt=""
        className="aspect-square object-cover"
        width={100}
      />
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
          <input
            type="file"
            name="avatar"
            accept=".jpg,.jpeg"
            className="border"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <br />
          <LoadingButton loading={loading}>ثبت تغییرات</LoadingButton>
        </form>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default UserPage;
