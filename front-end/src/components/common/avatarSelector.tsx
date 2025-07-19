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
  };

  const deleteAvatar = async () => {
    const response = await call(
      axios.delete(SERVER_API + "/user/dashboard/avatar"),
      true
    );
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
    <div className="relative flex flex-col">
      <Img
        pic={user?.avatar}
        sizes={"500px"}
        className={"aspect-square object-cover"}
        width={100}
      ></Img>
      <button className="w-fit" onClick={deleteAvatar}>حذف آواتار</button>
      <form onSubmit={handleSubmit}>
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
  );
};
export default AvatarSelector;
