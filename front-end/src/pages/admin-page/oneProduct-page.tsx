import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../hooks/callManager";
import LoadingButton from "../../components/common/loadingButton";
import { buildSelectionList } from "../../helpers/buildSelectionList";
import useLoadCategories from "../../hooks/useLoadCategories";
import { PropertiesObj } from "../../types/objects/propertiesObj";
import PropertiesManager from "../../components/common/propertiesManager";
import useLoadPropertiesAndVals from "../../hooks/useLoadPropertiesAndVals";

const OneProductPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const selectionList = useRef<HTMLSelectElement>(null);
  const { categories, loadCategories } = useLoadCategories();
  const { propertiesAndVals, loadPropertiesAndVals } =
    useLoadPropertiesAndVals();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    properties: [],
    img: "",
  });
  const [properties, setProperties] = useState<PropertiesObj[]>([]);
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
      properties: matchedProduct.properties,
      img: matchedProduct.img,
    });
    setProperties([...matchedProduct.properties]);
  }

  function refresh() {
    loadCategories();
  }

  useEffect(() => {
    setFormData((prev: any) => {
      return { ...prev, properties: JSON.stringify([...properties]) };
    });
  }, [properties]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    buildSelectionList(selectionList, categories, "", "بدون دسته بندی", null);
    if (categories.length) {
      loadOneProduct();
      loadPropertiesAndVals();
    }
  }, [categories]);

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
        SERVER_API + `/admin/dashboard/products/${productId}`,
        formData
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
            type="text"
            placeholder="img"
            name="img"
            value={formData.img}
            className="border"
            onChange={handleChange}
          />
          <br />

          <LoadingButton loading={loading}>بروزرسانی</LoadingButton>
        </form>
        <PropertiesManager
          properties={properties}
          setProperties={setProperties}
          propertiesAndVals={propertiesAndVals}
          loadPropertiesAndVals={loadPropertiesAndVals}
        ></PropertiesManager>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default OneProductPage;
