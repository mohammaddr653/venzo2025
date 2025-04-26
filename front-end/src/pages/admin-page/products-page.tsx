import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../helpers/calls/callManager";
import { SERVER_URL, SERVER_API, DEFAULT_PRODUCT } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";

const ProductsPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const selectionList = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    img: "",
  });
  const fileInputRef = useRef<any>(null);

  async function loadProducts() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/products"),
      false
    );
    setProducts([...response.data.data]);
  }
  async function loadCategories() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/categories"),
      false
    );
    setCategories([...response.data.data]);
  }

  useEffect(() => {
    function selectionListLoop(item: any, parent: any) {
      const newOption = document.createElement("option");
      newOption.value = item._id;
      newOption.textContent = item.name;
      parent.appendChild(newOption);
      categories.map((category) => {
        if (category.motherId === item._id) {
          selectionListLoop(category, parent);
        }
      });
    }
    if (selectionList.current) {
      selectionList.current.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "بدون دسته بندی";
      selectionList.current.appendChild(defaultOption);
      categories.forEach((category: any) => {
        if (category.motherId === "root") {
          selectionListLoop(category, selectionList.current);
        }
      });
    }
  }, [categories]);

  async function loadProductsAndCats() {
    setFormData({
      name: "",
      price: "",
      stock: "",
      categoryId: "",
      description: "",
      img: "",
    });
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    loadCategories();
    loadProducts();
  }
  useEffect(() => {
    loadProductsAndCats();
  }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/products", dataToSend),
      true
    );
    loadProductsAndCats();
  };

  return (
    <div>
      <h1>مدیریت محصولات</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            className="border"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="price"
            name="price"
            value={formData.price}
            className="border"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="stock"
            name="stock"
            value={formData.stock}
            className="border"
            onChange={handleChange}
          />
          <br />
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
          <br />
          <LoadingButton loading={loading}>افزودن محصول</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of products</caption>
          <thead>
            <tr>
              <th className="border">image</th>
              <th className="border">name</th>
              <th className="border">price</th>
              <th className="border">stock</th>
              <th className="border">categoryId</th>
              <th className="border">operation</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <img
                      src={
                        product.img ? SERVER_URL + product.img : DEFAULT_PRODUCT
                      }
                      alt=""
                      className="aspect-square object-cover"
                      width={100}
                    />
                  </td>
                  <td className="border">{product.name}</td>
                  <td className="border">{product.price}</td>
                  <td className="border">{product.stock}</td>
                  <td className="border">
                    {product.categoryId ? product.categoryId : "بدون دسته بندی"}
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, productId = product._id) => {
                        handleDelete(e, productId);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={(e, productId = product._id) => {
                        handleUpdate(e, productId);
                      }}
                    >
                      ویرایش
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
export default ProductsPage;
