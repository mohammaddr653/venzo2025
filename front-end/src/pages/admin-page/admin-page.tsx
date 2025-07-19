import { Link } from "react-router-dom";
import LoadingButton from "../../components/common/loadingButton";
import { DEFAULT_AVATAR, SERVER_API, SERVER_URL } from "../../../config";
import callManager from "../../hooks/callManager";
import useLoadUser from "../../hooks/useLoadUser";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AvatarSelector from "../../components/common/avatarSelector";

const AdminPage = () => {
  const { call, loading } = callManager();
  const { user, userLoading, getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    name: "",
  });
  const fileInputRef = useRef<any>(null);

  function refresh() {
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

    // Append all form fields to FormData
    const response = await call(
      axios.put(SERVER_API + "/user/dashboard", formData),
      true
    );
    getAuthedUser();
  };

  return (
    <div>
      <h1 className="bg-blue-300">hello admin</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.isadmin ? "is admin" : "not admin"}</h1>
      <h1>admin page</h1>
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
      <div className="bg-gray-300 flex">
        <Link to={"/admin/users"}>مدیریت کاربران</Link>
        <Link to={"/admin/medias"}>کتابخانه</Link>
        <Link to={"/admin/categories"}>مدیریت دسته بندی ها</Link>
        <Link to={"/admin/products"}>مدیریت محصولات</Link>
        <Link to={"/admin/properties"}>مدیریت ویژگی ها</Link>
        {/* <Link to={"/admin/blogs"}>مدیریت مقالات</Link> */}
      </div>
      <br />
      <h3>پیکره بندی صفحه</h3>
      <Link to={"/admin/page/banners"}>مدیریت بنر ها</Link>
      <Link to={"/admin/page/trusts"}>مدیریت اعتماد ها</Link>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default AdminPage;
