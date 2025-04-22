import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import callManager from "../../helpers/calls/callManager";
import { useUserStore } from "../../store";
import { SERVER_URL } from "../../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const { call, loading } = callManager();
  const [categories, setCategories] = useState<any[]>([]);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    motherId: "",
    path: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function loadCategories() {
    const response = await call(
      axios.get(SERVER_URL + "/admin/dashboard/categories"),
      false
    );
    setCategories([...response.data.data]);
  }
  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_URL + `/admin/dashboard/categories/${categoryId}`),
      true
    );
    loadCategories();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: any
  ) => {
    navigate("/admin/update-category", { state: { categoryId, categories } });
  };

  const handleRefresh = () => {
    loadCategories();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_URL + "/admin/dashboard/categories", formData),
      true
    );
    loadCategories();
  };

  return (
    <div>
      <h1>مدیریت دسته بندی ها</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="border"
            onChange={handleChange}
          />
          <select
            id="motherId"
            name="motherId"
            onChange={handleChange}
            className="border"
          >
            <option value="">دسته بندی مادر</option>
            {categories?.map((category: any, index: any) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="path"
            placeholder="path"
            className="border"
            onChange={handleChange}
          />
          <LoadingButton loading={loading}>ساخت دسته بندی</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of categories</caption>
          <thead>
            <tr>
              <th className="border">name</th>
              <th className="border">motherId</th>
              <th className="border">path</th>
              <th className="border">operation</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">{category.name}</td>
                  <td className="border">{category.motherId}</td>
                  <td className="border">{category.path}</td>
                  <td className="border">
                    <button
                      onClick={(e, categoryId = category._id) => {
                        handleDelete(e, categoryId);
                      }}
                    >
                      REMOVE
                    </button>
                    <button
                      onClick={(e, categoryId = category._id) => {
                        handleUpdate(e, categoryId);
                      }}
                    >
                      UPDATE
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
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default CategoriesPage;
