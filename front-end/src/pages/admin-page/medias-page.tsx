import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../hooks/callManager";
import { SERVER_URL, SERVER_API, DEFAULT_PRODUCT } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import useLoadMedias from "../../hooks/useLoadMedias";
import Img from "../../components/common/img";
const MediasPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const { medias, loadMedias } = useLoadMedias();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    media: [],
  });
  const [updateFormData, setUpdateFormData] = useState<any>();
  const [selectedMediaId, setSelectedMediaId] = useState<any>(null);

  const fileInputRef = useRef<any>(null);
  const updateFileInputRef = useRef<any>(null);

  async function refresh() {
    setFormData({
      media: [],
    });
    // Reset file input field
    fileInputRef.current ? (fileInputRef.current.value = "") : null;
    updateFileInputRef.current ? (updateFileInputRef.current.value = "") : null;

    loadMedias();
  }

  useEffect(() => {
    refresh();
  }, []);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, media: event.target.files });
  };

  const handleUpdateFileChange = (event: any) => {
    setUpdateFormData({ ...formData, media: event.target.files[0] });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    mediaId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/medias/${mediaId}`),
      true
    );
    refresh();
  };

  const updateShowState = (e: any) => {
    if (e.target.name === "active" && e.target.checked) {
      setUpdateFormData({ ...updateFormData, show: true });
    }
    if (e.target.name === "deactive" && e.target.checked) {
      setUpdateFormData({ ...updateFormData, show: false });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(updateFormData).forEach(([key, value]: any) => {
      dataToSend.append(key, value);
    });

    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/medias/${selectedMediaId}`,
        dataToSend
      ),
      true
    );
    refresh();
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === "media") {
        for (let file of value) {
          dataToSend.append(key, file);
        }
      } else {
        dataToSend.append(key, value);
      }
    });
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/medias", dataToSend),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت رسانه ها</h1>
      <br />
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="file"
            name="media"
            accept=".png,.jpg"
            className="border"
            multiple={true}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <br />
          <LoadingButton loading={loading}>افزودن رسانه</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of medias</caption>
          <thead>
            <tr>
              <th className="border">رسانه</th>
              <th className="border">جزئیات</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {medias?.map((media: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <Img
                      pic={media}
                      sizes={"500px"}
                      className={"aspect-square object-cover"}
                      width={100}
                    ></Img>
                  </td>
                  <td className="border">
                    {selectedMediaId === media._id.toString() ? (
                      <form onSubmit={(e) => handleUpdate(e)}>
                        <input
                          type="file"
                          name="media"
                          accept=".png,.jpg"
                          className="border"
                          onChange={handleUpdateFileChange}
                          ref={updateFileInputRef}
                        />
                        <LoadingButton loading={loading}>اعمال</LoadingButton>
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setUpdateFormData({
                            media: media.media,
                          });
                          setSelectedMediaId(media._id.toString());
                        }}
                      >
                        ویرایش
                      </button>
                    )}
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, mediaId = media._id) => {
                        handleDelete(e, mediaId);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " product"}
      </div>
    </div>
  );
};
export default MediasPage;
