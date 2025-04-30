import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../helpers/callManager";
import LoadingButton from "../../components/common/loadingButton";
import { buildSelectionList } from "../../helpers/buildSelectionList";

const OneCategoryPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    motherId: "",
    path: "",
  });
  const { state } = useLocation();
  const { categoryId, categories } = state || null;
  const selectionList = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    buildSelectionList(
      selectionList,
      categories,
      "root",
      "دسته بندی مادر",
      categoryId
    );
  }, [categories]);

  async function loadOneCategory() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/categories/${categoryId}`),
      false
    );
    const matchedCategory = response.data.data;
    setFormData({
      ...formData,
      name: matchedCategory.name,
      motherId: matchedCategory.motherId,
      path: matchedCategory.path,
    });
  }
  useEffect(() => {
    loadOneCategory();
  }, []);

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
      axios.put(
        SERVER_API + `/admin/dashboard/categories/${categoryId}`,
        formData
      ),
      true
    );
  };

  return (
    <div>
      <h1>مشاهده یک دسته بندی</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <select
            id="motherId"
            name="motherId"
            value={formData?.motherId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {categories?.map((category: any, index: any) => {
              if (category._id !== categoryId) {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              }
            })}
          </select>
          <input
            type="text"
            className="border rounded p-3"
            placeholder="path"
            name="path"
            value={formData?.path}
            onChange={handleChange}
          />

          <LoadingButton loading={loading}>بروزرسانی</LoadingButton>
        </form>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default OneCategoryPage;
