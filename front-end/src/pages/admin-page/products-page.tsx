import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../hooks/callManager";
import { SERVER_URL, SERVER_API, DEFAULT_PRODUCT } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import { buildSelectionList } from "../../helpers/buildSelectionList";
import useLoadCategories from "../../hooks/useLoadCategories";
import useLoadProducts from "../../hooks/useLoadProducts";
import { Editor } from "@tinymce/tinymce-react";
import PropertiesManager from "../../components/common/propertiesManager";
import useLoadPropertiesAndVals from "../../hooks/useLoadPropertiesAndVals";
import { NewProductFormData } from "../../types/objects/newProductFormData";
import { PropertiesObj } from "../../types/objects/propertiesObj";
import Library from "../../components/common/library";
import Img from "../../components/common/img";
import DiscountManager from "../../components/common/discountManager";
const ProductsPage = () => {
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
    setFormData((prev: any) => {
      return { ...prev, properties: JSON.stringify([...properties]) };
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

  return (
    <div>
      <h1>مدیریت محصولات</h1>
      <div className="bg-red-300">
        <form id="newProduct" onSubmit={handleSubmit} className="flex-column">
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
          <DiscountManager setDiscount={setDiscount}></DiscountManager>
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

          {/* note:need to be modify for uploads */}
          <Editor
            apiKey="ajfufhhbmu74o5t6nn4o9rj4ba4wwrhp3gxd6lk3k668y54x"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            onEditorChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            value={formData.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="flex flex-row items-center">
            <Img
              pic={selectedImgs[0]}
              sizes={"500px"}
              className={"aspect-square object-cover"}
              width={100}
            ></Img>
            <p
              className="cursor-pointer"
              onClick={() => {
                setLibShow(true);
              }}
            >
              افزودن تصویر محصول
            </p>
            {libShow ? (
              <Library
                libShow={libShow}
                setLibShow={setLibShow}
                selectedImgs={selectedImgs}
                setSelectedImgs={setSelectedImgs}
              ></Library>
            ) : null}
          </div>
          <br />
          <PropertiesManager
            properties={properties}
            setProperties={setProperties}
            propertiesAndVals={propertiesAndVals}
            loadPropertiesAndVals={loadPropertiesAndVals}
          ></PropertiesManager>
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
                    <Img
                      pic={product?.img}
                      sizes={"100px"}
                      className={"aspect-square object-cover"}
                      width={100}
                    ></Img>
                  </td>
                  <td className="border">{product.name}</td>
                  <td className="border">{product.price}</td>
                  <td className="border">{product.stock}</td>
                  <td className="border">
                    {product.categoryId
                      ? categories.map((category) => {
                          return category._id === product.categoryId
                            ? category.name
                            : null;
                        })
                      : "بدون دسته بندی"}
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
