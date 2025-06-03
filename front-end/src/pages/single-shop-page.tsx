import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import { ChangeEvent, useEffect, useState } from "react";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";
import callManager from "../helpers/callManager";

const SingleShopPage = () => {
  const { productId } = useParams();
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [product, setProduct] = useState<any>();
  const [defaultSelectiveProperty, setDefaultSelectiveProperty] =
    useState<string>();
  const [formData, setFormData] = useState<any>({
    selectedPropertyvalString: "",
  });

  useEffect(() => {
    load();
  }, [productId]);

  function setDefault() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    setDefaultSelectiveProperty(selectiveProperty?.values[0].value.toString());
  }

  useEffect(() => {
    if (product) setDefault();
  }, [product]);
  useEffect(() => {
    if (defaultSelectiveProperty)
      setFormData({ selectedPropertyvalString: defaultSelectiveProperty });
  }, [defaultSelectiveProperty]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/single-shop/withProperties/${productId}`),
      false
    );
    setProduct(response.data.data);
  }
  useEffect(() => {
    console.log("this is formData : ", formData);
  }, [formData]);

  async function handleAddToCart(id: string) {
    const response = await call(
      axios.post(SERVER_API + `/cart/${id}`, formData),
      true
    );
  }

  const handleSelectProperty = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData({ selectedPropertyvalString: e.target.value });
    }
  };
  return (
    <div>
      <Header></Header>
      <h1>single shop page</h1>
      <div className="bg-green-300">
        <img
          src={product?.img ? SERVER_URL + product?.img : DEFAULT_PRODUCT}
          alt=""
          className="aspect-square object-cover"
          width={100}
        />
        <p>{product?.name}</p>
        <p>{product?.price}</p>
        <p>{product?.stock}</p>
        {product?.properties.length
          ? product.properties.map((property: any, index: any) => {
              if (property.selective) {
                return (
                  <form key={index}>
                    <h4>انتخاب {property.nameString}</h4>
                    {property.values.map((propertyval: any, index: any) => {
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="selectiveProperty"
                            value={propertyval.value.toString()}
                            checked={
                              formData.selectedPropertyvalString.includes(
                                propertyval.value.toString()
                              )
                                ? true
                                : false
                            }
                            onChange={(e) => handleSelectProperty(e)}
                          />
                          {propertyval.valueString}
                        </label>
                      );
                    })}
                  </form>
                );
              }
            })
          : null}
        <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
        {product?.properties.some((obj: any) => !obj.selective) ? (
          <ul>
            {product.properties
              .filter((obj: any) => !obj.selective)
              .map((property: any, index: any) => {
                return (
                  <li key={index} className="flex flex-row gap-4">
                    <span>{property.nameString}</span>
                    <div className="flex flex-row gap-1">
                      {property.values.map((propertyval: any, index: any) => {
                        return (
                          <span key={index}>{propertyval.valueString}</span>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : null}
        <button onClick={() => handleAddToCart(product._id)}>
          افزودن به سبد خرید
        </button>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default SingleShopPage;
