import { useEffect, useRef, useState } from "react";
import callManager from "../../hooks/callManager";
import Img from "./img";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { SERVER_API } from "../../../config";
import useLoadUser from "../../hooks/useLoadUser";

const AvatarSelector = ({ user }: any) => {
  const { call, loading } = callManager();
  const { getAuthedUser } = useLoadUser();
  const [avatarPreview, setAvatarPreview] = useState<any>(null);
  const [avatarEditShow, setAvatarEditShow] = useState<any>(false);

  const [formData, setFormData] = useState({
    avatar: "",
  });
  const fileInputRef = useRef<any>(null);

  function refresh() {
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormData({
      avatar: "",
    });
  }

  useEffect(() => {
    refresh();
  }, [user]);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, avatar: event.target.files[0] });
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const deleteAvatar = async () => {
    const response = await call(
      axios.delete(SERVER_API + "/user/dashboard/avatar"),
      true
    );
    setAvatarPreview(null);
    getAuthedUser();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    const response = await call(
      axios.post(SERVER_API + "/user/dashboard/avatar", dataToSend),
      true
    );
    getAuthedUser();
  };

  return (
    <>
      <div className="relative grid grid-cols-6 gap-2 bg-red-700">
        <div className="bg-amber-600 flex flex-col items-center">
          <button className="w-fit" onClick={() => setAvatarEditShow(true)}>
            ✏
          </button>
        </div>
        <div className="bg-amber-600 col-span-4">
          <Img
            pic={user?.avatar}
            sizes={"500px"}
            className={"rounded-full aspect-square object-cover w-full"}
            width={100}
          ></Img>
        </div>
        <div className="bg-amber-600"></div>
      </div>
      {avatarEditShow && (
        <div className="fixed w-screen h-screen top-0 right-0 z-60 flex justify-center items-center">
          <div
            className="bg-glass-shadow w-full h-full absolute top-0 right-0"
            onClick={() => setAvatarEditShow(false)}
          ></div>
          <div className="w-[80%] h-[80%] z-10 bg-white flex flex-col justify-start overflow-y-scroll">
            <button
              onClick={() => setAvatarEditShow(false)}
              className=" flex w-fit self-end p-5"
            >
              ❌
            </button>
            <div className=" flex flex-col gap-5 justify-center items-center p-5">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt=""
                  className={"rounded-full aspect-square object-cover"}
                  width={300}
                />
              ) : (
                <Img
                  pic={user?.avatar}
                  sizes={"500px"}
                  className={"rounded-full aspect-square object-cover"}
                  width={300}
                ></Img>
              )}
              <div className="flex gap-2">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <label
                    htmlFor="newAvatar"
                    className="border border-neutral-500 rounded-full flex justify-center items-center bg-neutral-400 text-white w-10 h-10"
                  >
                    <input
                      id="newAvatar"
                      type="file"
                      name="avatar"
                      accept=".jpg,.jpeg"
                      className="border hidden"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    +
                  </label>
                  <br />
                  <LoadingButton
                    className={
                      "bg-green-500 text-white cursor-pointer text-shadow px-2 py-0.5 rounded-md"
                    }
                    loading={loading}
                  >
                    ثبت تغییرات
                  </LoadingButton>
                </form>
                <button
                  className="w-fit bg-red-500 cursor-pointer text-white text-shadow px-2 py-0.5 rounded-md"
                  onClick={deleteAvatar}
                >
                  حذف تصویر
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AvatarSelector;
