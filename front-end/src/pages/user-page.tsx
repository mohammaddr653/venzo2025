import { useEffect, useRef, useState } from "react";
import callManager from "../hooks/callManager";
import { DEFAULT_AVATAR, SERVER_API, SERVER_URL } from "../../config";
import axios, { all } from "axios";
import LoadingButton from "../components/common/loadingButton";
import useLoadUser from "../hooks/useLoadUser";
import AvatarSelector from "../components/common/avatarSelector";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const UserPage = () => {
  const { call, loading } = callManager();
  const { user, userLoading, getAuthedUser } = useLoadUser();
  const [allParams, setAllParams] = useSearchParams();
  const [route, setRoute] = useState<any>();
  const [formData, setFormData] = useState({
    name: "",
  });

  function refresh() {
    setFormData({
      name: user ? user.name : "",
    });
  }

  useEffect(() => {
    setRoute(allParams.get("route") ?? "edit-account"); //اگر در آدرس روت وجود داشت بذار وگرنه پنجره ویرایش حساب رو نشون بده
  }, [allParams]);

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

  const handleRoute = async (e: any) => {
    e.preventDefault();
    let currentParams = new URLSearchParams(allParams);
    currentParams.set("route", e.target.id);
    setAllParams(currentParams);
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
          <div className="flex flex-[1] flex-col items-center">
            <AvatarSelector user={user}></AvatarSelector>
            <h1 className="text-center py-2 font-extrabold">{user?.name}</h1>
            <div className="w-full flex flex-col gap-2 items-stretch mt-10">
              <button
                id="edit-account"
                className={`text-right py-1 cursor-pointer ${
                  route === "edit-account" && "text-green-600 font-extrabold"
                }`}
                onClick={(e) => handleRoute(e)}
              >
                ویرایش اکانت
              </button>
              <button
                id="orders"
                className={`text-right py-1 cursor-pointer ${
                  route === "orders" && "text-green-600 font-extrabold"
                }`}
                onClick={(e) => handleRoute(e)}
              >
                سفارش های من
              </button>
            </div>
          </div>
          <div className="flex-[4] bg-amber-500 border-r border-neutral-300">
            {route === "edit-account" && (
              <div>
                edit account
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
            )}
            {route === "orders" && <div>your orders</div>}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default UserPage;
