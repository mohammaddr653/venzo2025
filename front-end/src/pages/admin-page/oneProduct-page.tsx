import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../helpers/callManager";
import LoadingButton from "../../components/common/loadingButton";
import { buildSelectionList } from "../../helpers/buildSelectionList";

const OneProductPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const selectionList = useRef<HTMLSelectElement>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    img: "",
  });
  const fileInputRef = useRef<any>(null);
  const { state } = useLocation();
  const { productId } = state || null;

  async function loadOneProduct() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/products/${productId}`),
      false
    );
    const matchedProduct = response.data.data;
    setFormData({
      ...formData,
      name: matchedProduct.name,
      price: matchedProduct.price,
      stock: matchedProduct.stock,
      categoryId: matchedProduct.categoryId ? matchedProduct.categoryId : "",
      description: matchedProduct.description,
      img: matchedProduct.img,
    });
  }

  async function loadCategories() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/categories"),
      false
    );
    setCategories([...response.data.data]);
  }

  function refresh() {
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    loadCategories();
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    buildSelectionList(selectionList, categories, "", "بدون دسته بندی", null);
    loadOneProduct();
  }, [categories]);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, img: event.target.files[0] });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });

    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/products/${productId}`,
        dataToSend
      ),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مشاهده یک محصول</h1>
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
          <input
            type="text"
            className="border rounded p-3"
            placeholder="price"
            name="price"
            value={formData?.price}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3"
            placeholder="stock"
            name="stock"
            value={formData?.stock}
            onChange={handleChange}
          />
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {/* dynamic */}
          </select>
          <textarea
            name="description"
            placeholder="description"
            onChange={handleChange}
            value={formData.description}
            id="default"
            className="border"
          ></textarea>
          <input
            type="file"
            name="img"
            accept=".jpg,.jpeg"
            className="border"
            onChange={handleFileChange}
            ref={fileInputRef}
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
export default OneProductPage;
