import { Link, useParams } from "react-router-dom";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import { useEffect, useState } from "react";
import callManager from "../helpers/callManager";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";

const ShopPage = () => {
  const { categoryId } = useParams();
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [products, setProducts] = useState<any[]>([]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/shop/${categoryId}`),
      false
    );
    setProducts([...response.data.data]);
  }

  useEffect(() => {
    load();
  }, [categoryId]);
  return (
    <div>
      <Header></Header>
      <h1>shop page</h1>
      <div className="bg-amber-700 p-5 flex flex-row gap-3">
        {products?.map((item: any, index) => {
          return (
            <Link
              to={`/single-shop/${item._id}`}
              key={index}
              className="border"
            >
              <img
                src={item.img ? SERVER_URL + item.img : DEFAULT_PRODUCT}
                alt=""
                className="aspect-square object-cover"
                width={100}
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.stock}</p>
            </Link>
          );
        })}
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default ShopPage;
