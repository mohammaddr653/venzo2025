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
import CrossSvg from "../components/icons/cross-svg";
import ClientOrders from "../components/common/client-orders";

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
    setRoute(allParams.get("route") ?? "default"); //اگر در آدرس روت وجود داشت بذار وگرنه پنجره ویرایش حساب رو نشون بده
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
    currentParams.set("route", e.target.id ? e.target.id : "default");
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
        <div className="userpage-container flex md:gap-2 justify-center md:justify-between items-stretch px-5 md:px-20">
          <div className="flex flex-[1] flex-col items-center">
            <AvatarSelector user={user}></AvatarSelector>
            <h1 className="text-center py-2 font-extrabold">{user?.name}</h1>
            <div className="w-full flex flex-col gap-2 items-stretch mt-10">
              <button
                id="edit-account"
                className={`text-right py-1 cursor-pointer ${
                  (route === "edit-account" || route === "default") &&
                  "text-green-600 font-extrabold"
                }`}
                onClick={(e) => handleRoute(e)}
              >
                ویرایش مشخصات
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
          <div className="md:flex-[4] w-0 bg-amber-500 md:border-r border-neutral-300">
            {(route === "edit-account" || route === "default") && (
              <div
                className={`fixed ${
                  route === "default" && "hidden md:flex"
                } bg-white flex flex-col gap-5 py-2 md:static right-0 top-0 w-screen h-screen md:w-auto md:h-auto z-50 px-5`}
              >
                <div className="flex justify-between gap-2 items-center">
                  <h5>ویرایش مشخصات</h5>
                  <button
                    className="md:hidden cursor-pointer p-2 flex justify-center items-center"
                    onClick={(e) => handleRoute(e)}
                  >
                    <CrossSvg width={30} fill={"#444"}></CrossSvg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    className="border border-neutral-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                  <br />
                  <LoadingButton
                    className={
                      "mt-3 rounded-md py-1 px-2 border border-neutral-300 bg-green-600 text-white text-shadow"
                    }
                    loading={loading}
                  >
                    ثبت تغییرات
                  </LoadingButton>
                </form>
              </div>
            )}
            {route === "orders" && (
              <div
                className={`fixed overflow-y-scroll md:overflow-y-auto bg-white flex flex-col gap-5 py-2 md:static right-0 top-0 w-screen h-screen md:w-auto md:h-auto z-50 px-5`}
              >
                <div className="flex justify-between gap-2 items-center">
                  <h5>سفارش های من</h5>
                  <button
                    className="md:hidden cursor-pointer p-2 flex justify-center items-center"
                    onClick={(e) => handleRoute(e)}
                  >
                    <CrossSvg width={30} fill={"#444"}></CrossSvg>
                  </button>
                </div>
                <ClientOrders></ClientOrders>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default UserPage;
