import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadProducts = () => {
  const { call, loading } = callManager();
  const [products, setProducts] = useState<any[]>([]);

  async function loadProducts() {
    const response = await call(axios.get(SERVER_API + "/shop"), false);
    setProducts([...response.data.data]);
  }
  return { products, loadProducts };
};

export default useLoadProducts;
