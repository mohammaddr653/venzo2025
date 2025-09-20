import { useEffect, useRef, useState } from "react";
import callManager from "../hooks/callManager";
import { DEFAULT_AVATAR, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";
import LoadingButton from "../components/common/loadingButton";
import useLoadUser from "../hooks/useLoadUser";
import AvatarSelector from "../components/common/avatarSelector";
import { Link } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

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
    <>
      <Header focus={true}></Header>
      <main className="pt-20 pb-15">
        <div className="userpage-container flex gap-2 justify-between items-stretch px-5 md:px-20">
          <div className="flex-[1] flex-col items-center">
            <AvatarSelector user={user}></AvatarSelector>
            <h1 className="text-center py-2 font-extrabold">{user?.name}</h1>
            <div className="bg-green-300 mt-5">
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
          </div>
          <div className="flex-[4] bg-amber-500">afe</div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default UserPage;
