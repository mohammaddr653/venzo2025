import { useEffect, useState } from "react";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import callManager from "../hooks/callManager";
import { SERVER_API } from "../../config";
import axios from "axios";

const ClientOrdersPage = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState<any>([]);
  const { call, loading } = callManager();

  async function loadOrders() {
    const response = await call(axios.get(SERVER_API + "/orders"), false);
    setOrders([...response.data.data]);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e: React.FormEvent, orderId: any) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + `/pay/${orderId}`),
      true
    );
    if (response.data.data)
      window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${response.data.data}`; //انتقال به صفحه پرداخت
  };

  return (
    <>
      <Header focus={true}></Header>
      <main className="pt-15">
        <div className="client-orders-page-container flex flex-col gap-5">
          <h1>client orders page</h1>
          <div>
            <table>
              <caption>لیست سفارش های شما</caption>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>قیمت کل</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice} تومان</td>
                      <td className="flex flex-row">
                        {order.status === "pending" ? (
                          <form onSubmit={(e) => handleSubmit(e, order._id)}>
                            <button className="p-2 bg-red-500 border">
                              پرداخت
                            </button>
                          </form>
                        ) : (
                          <p>تکمیل شده</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-sky-600">this is tailwind</div>
          <div className="bg-sky-300">
            this is zustand , hello{user ? user.name : " user"}
          </div>
        </div>
      </main>
    </>
  );
};
export default ClientOrdersPage;
