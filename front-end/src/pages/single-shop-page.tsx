import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import { useEffect, useState } from "react";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";
import callManager from "../helpers/callManager";

const SingleShopPage = () => {
  const { productId } = useParams();
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    load();
  }, [productId]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/single-shop/withProperties/${productId}`),
      false
    );
    setProduct(response.data.data);
  }

  async function handleAddToCart(id: string) {
    const response = await call(axios.post(SERVER_API + `/cart/${id}`), true);
  }
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
        <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
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
