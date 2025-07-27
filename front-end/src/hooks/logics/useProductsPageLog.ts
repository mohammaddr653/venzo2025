import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";
import useLoadPropertiesAndVals from "../useLoadPropertiesAndVals";
import useLoadProducts from "../useLoadProducts";
import useLoadCategories from "../useLoadCategories";
import { NewProductFormData } from "../../types/objects/newProductFormData";
import { PropertiesObj } from "../../types/objects/propertiesObj";
import { buildSelectionList } from "../../helpers/buildSelectionList";

const useProductsPageLog = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const { propertiesAndVals, loadPropertiesAndVals } =
    useLoadPropertiesAndVals();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);
  const { products, loadProducts } = useLoadProducts();
  const { categories, loadCategories } = useLoadCategories();
  const selectionList = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewProductFormData>({
    name: "",
    price: "",
    discount: "",
    stock: "",
    categoryId: "",
    description: "",
    properties: [],
    img: "",
  });
  const [properties, setProperties] = useState<PropertiesObj[]>([]);
  const [discount, setDiscount] = useState<any>();

  const editorRef = useRef<any>(null);

  useEffect(() => {
    const safeProperties = properties.filter((item) => item.values.length);
    setFormData((prev: any) => {
      return {
        ...prev,
        properties: JSON.stringify([...safeProperties]),
      };
    });
  }, [properties]);

  useEffect(() => {
    setFormData((prev: any) => {
      return {
        ...prev,
        discount: discount ? JSON.stringify(discount) : "",
      };
    });
  }, [discount]);

  useEffect(() => {
    if (selectedImgs.length) {
      setFormData((prev: any) => {
        return { ...prev, img: selectedImgs[0]._id };
      });
    } else {
      setFormData((prev: any) => {
        return { ...prev, img: "" };
      });
    }
  }, [selectedImgs]);

  useEffect(() => {
    buildSelectionList(selectionList, categories, "", "بدون دسته بندی", null);
  }, [categories]);

  async function loadProductsAndCats() {
    setFormData({
      name: "",
      price: "",
      discount: "",
      stock: "",
      categoryId: "",
      description: "",
      properties: [],
      img: "",
    });
    setSelectedImgs([]);
    setProperties([]);
    loadCategories();
    loadProducts();
    loadPropertiesAndVals();
  }

  useEffect(() => {
    loadProductsAndCats();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/products/${productId}`),
      true
    );
    loadProductsAndCats();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: any
  ) => {
    navigate("/admin/update-product", { state: { productId } });
  };

  const handleRefresh = () => {
    loadProductsAndCats();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/products", formData),
      true
    );
    loadProductsAndCats();
  };

  return {
    handleSubmit,
    formData,
    setFormData,
    handleChange,
    setDiscount,
    selectionList,
    editorRef,
    selectedImgs,
    setSelectedImgs,
    libShow,
    setLibShow,
    properties,
    loading,
    user,
    setProperties,
    propertiesAndVals,
    handleRefresh,
    products,
    categories,
    handleDelete,
    handleUpdate,
  };
};

export default useProductsPageLog;
