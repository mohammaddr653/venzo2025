import { useEffect, useState } from "react";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import callManager from "../helpers/callManager";
import { SERVER_API } from "../../config";
import axios from "axios";

const CartPage = () => {
  const { user } = useUserStore();
  const [reservedProducts, setReservedProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { call, loading } = callManager();

  async function loadCart() {
    const response = await call(axios.get(SERVER_API + "/cart"), false);
    setReservedProducts([...response.data.data.reservedProducts]);
    setTotalPrice(response.data.data.totalPrice);
  }
  useEffect(() => {
    loadCart();
  }, []);

  async function handleIncrement(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/cart/plus/${id}`),
      true
    );
    loadCart();
  }

  async function handleDecrement(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/cart/minus/${id}`),
      true
    );
    loadCart();
  }

  async function handleDelete(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.delete(SERVER_API + `/cart/delete/${id}`),
      true
    );
    loadCart();
  }

  return (
    <div>
      <Header></Header>
      <h1>cart page</h1>
      <div>
        <table>
          <caption>list of products</caption>
          <thead>
            <tr>
              <th>name</th>
              <th>total price</th>
              <th>count</th>
            </tr>
          </thead>
          <tbody>
            {reservedProducts?.map((product: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price * product.count}</td>
                  <td className="flex flex-row">
                    <span className="p-2 bg-red-500 text-amber-50 border border-b-black">
                      {product.count}
                    </span>
                    <form onSubmit={(e) => handleIncrement(e, product._id)}>
                      <button className="p-2 bg-red-500 border">+</button>
                    </form>
                    <form onSubmit={(e) => handleDecrement(e, product._id)}>
                      <button className="p-2 bg-red-500 border">-</button>
                    </form>
                    <form onSubmit={(e) => handleDelete(e, product._id)}>
                      <button className="p-2 bg-red-500 border">DELETE</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <h2>قیمت کل : {totalPrice}</h2>
      <form action="/pay" method="POST">
        <button>پرداخت</button>
      </form>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default CartPage;
