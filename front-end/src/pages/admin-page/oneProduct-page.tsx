import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_API, TMCE_API_KEY } from "../../../config";
import callManager from "../../hooks/callManager";
import LoadingButton from "../../components/common/loadingButton";
import { buildSelectionList } from "../../helpers/buildSelectionList";
import useLoadCategories from "../../hooks/useLoadCategories";
import { ProductPropertiesObj } from "../../types/objects/properties";
import PropertiesManager from "../../components/common/propertiesManager";
import useLoadPropertiesAndVals from "../../hooks/useLoadPropertiesAndVals";
import Img from "../../components/common/img";
import Library from "../../components/common/library";
import { Editor } from "@tinymce/tinymce-react";

const OneProductPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const selectionList = useRef<HTMLSelectElement>(null);
  const { categories, loadCategories } = useLoadCategories();
  const { propertiesAndVals, loadPropertiesAndVals } =
    useLoadPropertiesAndVals();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    properties: [],
    img: "",
  });
  const [properties, setProperties] = useState<ProductPropertiesObj[]>([]);
  const { state } = useLocation();
  const { productId } = state || null;
  const editorRef = useRef<any>(null);

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
    });
    setProperties([...matchedProduct.properties]);
    if (matchedProduct.img)
      setSelectedImgs((prev: any) => {
        return [...prev, matchedProduct.img];
      });
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
          {/* note:need to be modify for uploads */}
          <Editor
            apiKey={TMCE_API_KEY}
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

          <LoadingButton loading={loading}>بروزرسانی</LoadingButton>
        </form>
        <PropertiesManager
          properties={properties}
          setProperties={setProperties}
          propertiesAndVals={propertiesAndVals}
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
