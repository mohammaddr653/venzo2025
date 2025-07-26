import { useParams } from "react-router-dom";
import { useUserStore } from "../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../../hooks/callManager";
import { createPriceAndStockObj } from "../../helpers/createPriceAndStockObj";

const useSingleShopLog = () => {
  const { productId } = useParams();
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [product, setProduct] = useState<any>();
  const [motherCats, setMotherCats] = useState<any[]>([]);
  const [priceAndStock, setPriceAndStock] = useState<any>({
    price: null,
    discount: null,
    percent: null,
    stock: null,
  });
  const [defaultSelectiveProperty, setDefaultSelectiveProperty] = useState<any>(
    {
      id: "",
      valueString: "",
    }
  );
  const [formData, setFormData] = useState<any>({
    selectedPropertyvalString: "",
  });
  const [selectedPropertyvalString, setSelectedPropertyvalString] =
    useState<any>("");

  useEffect(() => {
    load();
  }, [productId]);

  function setDefault() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    if (selectiveProperty) {
      setDefaultSelectiveProperty({
        id: selectiveProperty?.values[0].value.toString(),
        valueString: selectiveProperty?.values[0].valueString,
      });
    }
  }

  function findSelectedPropertyval() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    const selectedPropertyval = selectiveProperty.values.find(
      (propertyval: any) =>
        formData.selectedPropertyvalString.includes(
          propertyval.value.toString()
        )
    );
    return selectedPropertyval;
  }

  function handlePriceAndStock(obj: any) {
    const priceAndStockObj = createPriceAndStockObj(obj);
    setPriceAndStock({ ...priceAndStockObj });

    setPriceAndStock({ ...priceAndStockObj });
  }

  useEffect(() => {
    if (product) {
      if (formData.selectedPropertyvalString === "") {
        handlePriceAndStock(product);
        setDefault();
      } else {
        const selectedPropertyval = findSelectedPropertyval();
        handlePriceAndStock(selectedPropertyval);
      }
    }
  }, [product, formData]);

  useEffect(() => {
    if (
      defaultSelectiveProperty.id !== "" &&
      defaultSelectiveProperty.valueString !== ""
    ) {
      setFormData({ selectedPropertyvalString: defaultSelectiveProperty.id });
      setSelectedPropertyvalString(defaultSelectiveProperty.valueString);
    }
  }, [defaultSelectiveProperty]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/single-shop/withProperties/${productId}`),
      false
    );
    setProduct(response.data.data.product);
    setMotherCats([...response?.data.data.motherCategories.reverse()]);
  }

  async function handleAddToCart(id: string) {
    const response = await call(
      axios.post(SERVER_API + `/cart/${id}`, formData),
      true
    );
  }

  const handleSelectProperty = (
    e: ChangeEvent<HTMLInputElement>,
    propertyvalString: any
  ) => {
    if (e.target.checked) {
      setFormData({ selectedPropertyvalString: e.target.value });
      setSelectedPropertyvalString(propertyvalString);
    }
  };

  return {
    product,
    motherCats,
    priceAndStock,
    formData,
    handleSelectProperty,
    handleAddToCart,
    selectedPropertyvalString,
  };
};

export default useSingleShopLog;
