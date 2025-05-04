import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import callManager from "../../helpers/callManager";
import { useUserStore } from "../../store";
import { SERVER_API } from "../../../config";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildSelectionList } from "../../helpers/buildSelectionList";
import useLoadCategories from "../../helpers/useLoadCategories";

const CategoriesPage = () => {
  const { call, loading } = callManager();
  const { categories, loadCategories } = useLoadCategories();
  const list = useRef<HTMLUListElement>(null);
  const selectionList = useRef<HTMLSelectElement>(null);
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

  async function refresh() {
    setFormData({
      name: "",
      motherId: "",
      path: "",
    });
    loadCategories();
  }
  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    function listLoop(item: any, parent: any) {
      const newLi = document.createElement("li");

      const liHead = document.createElement("div");
      liHead.classList.add(
        "border",
        "p-2",
        "my-1",
        "flex",
        "justify-between",
        "gap-4"
      );

      const title = document.createElement("h4");
      title.innerHTML = item.name;

      const liButtons = document.createElement("div");
      liButtons.classList.add("flex", "gap-2");

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "حذف";
      const updateBtn = document.createElement("button");
      updateBtn.innerText = "ویرایش";
      [deleteBtn, updateBtn].forEach((btn, i) => {
        btn.classList.add("bg-yellow-200");
        liButtons.appendChild(btn);
        btn.onclick = (e, categoryId = item._id) => {
          i == 0 ? handleDelete(categoryId) : null;
          i == 1 ? handleUpdate(categoryId) : null;
        };
      });

      liHead.appendChild(title);
      liHead.appendChild(liButtons);
      newLi.appendChild(liHead);
      parent.appendChild(newLi);
      categories.map((category) => {
        if (category.motherId === item._id) {
          const newUl = document.createElement("ul");
          newUl.classList.add("ps-5");
          newLi.appendChild(newUl);
          listLoop(category, newUl);
        }
      });
    }
    if (list.current) {
      list.current.innerHTML = "";
      categories.forEach((category: any) => {
        if (category.motherId === "root") {
          listLoop(category, list.current);
        }
      });
    }
    buildSelectionList(selectionList, categories, "", "دسته بندی مادر", null);
  }, [categories]);

  const handleDelete = async (categoryId: any) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/categories/${categoryId}`),
      true
    );
    refresh();
  };

  const handleUpdate = async (categoryId: any) => {
    navigate("/admin/update-category", { state: { categoryId, categories } });
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/categories", formData),
      true
    );
    refresh();
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
            value={formData.name}
            onChange={handleChange}
          />
          <select
            id="motherId"
            name="motherId"
            value={formData.motherId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {/* dynamic */}
          </select>
          <input
            type="text"
            name="path"
            placeholder="path"
            value={formData.path}
            className="border"
            onChange={handleChange}
          />
          <LoadingButton loading={loading}>ساخت دسته بندی</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <h1>لیست دسته بندی ها</h1>
        <ul className="bg-green-300 p-2" ref={list}>
          {/* dynamic */}
        </ul>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default CategoriesPage;
