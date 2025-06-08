import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../hooks/callManager";
import { SERVER_URL, SERVER_API, DEFAULT_PRODUCT } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import useLoadPropertiesAndVals from "../../hooks/useLoadPropertiesAndVals";
import useLoadBanners from "../../hooks/useLoadBanners";
const BannersPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  useLoadPropertiesAndVals();
  const { banners, loadBanners } = useLoadBanners();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    image: "",
    show: false,
  });
  const fileInputRef = useRef<any>(null);

  async function refresh() {
    setFormData({
      image: "",
      show: false,
    });
    // Reset file input field
    fileInputRef.current ? (fileInputRef.current.value = "") : null;
    loadBanners();
  }

  useEffect(() => {
    refresh();
  }, []);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleShowChange = (event: any) => {
    if (event.target.name === "active" && event.target.checked) {
      setFormData({ ...formData, show: true });
    }
    if (event.target.name === "deactive" && event.target.checked) {
      setFormData({ ...formData, show: false });
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    bannerId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/page/banners/${bannerId}`),
      true
    );
    refresh();
  };

  const handleUpdate = async (e: any, bannerId: any) => {
    let updateFormData: any = {};
    if (e.target.name === "active" && e.target.checked) {
      updateFormData.show = true;
    }
    if (e.target.name === "deactive" && e.target.checked) {
      updateFormData.show = false;
    }
    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/page/banners/${bannerId}`,
        updateFormData
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
      dataToSend.append(key, value);
    });
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/page/banners", dataToSend),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت بنرها</h1>
      <br />
      <h4>لطفا بنر ها را با ابعاد مشابه ایجاد کنید تا باعث ناهماهنگی نشود</h4>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg"
            className="border"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <br />
          <label>
            <input
              type="radio"
              name="active"
              checked={formData.show}
              onChange={(e) => handleShowChange(e)}
            />
            فعال
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="deactive"
              checked={!formData.show}
              onChange={(e) => handleShowChange(e)}
            />
            غیرفعال
          </label>
          <br />
          <LoadingButton loading={loading}>افزودن بنر</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of products</caption>
          <thead>
            <tr>
              <th className="border">image</th>
              <th className="border">وضعیت</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <img
                      src={SERVER_URL + banner.image}
                      alt=""
                      className="aspect-square object-cover"
                      width={100}
                    />
                  </td>
                  <td className="border">
                    <form>
                      <label>
                        <input
                          type="radio"
                          name="active"
                          checked={banner.show}
                          onChange={(e) =>
                            handleUpdate(e, banner._id.toString())
                          }
                        />
                        فعال
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="deactive"
                          checked={!banner.show}
                          onChange={(e) =>
                            handleUpdate(e, banner._id.toString())
                          }
                        />
                        غیرفعال
                      </label>
                    </form>
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, bannerId = banner._id) => {
                        handleDelete(e, bannerId);
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
export default BannersPage;
