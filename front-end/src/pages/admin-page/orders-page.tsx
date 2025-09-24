import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import callManager from "../../hooks/callManager";
import { SERVER_API } from "../../../config";
import axios from "axios";
import OrderStatus from "../../components/common/order-status";

const OrdersPage = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState<any>([]);
  const { call, loading } = callManager();

  async function loadOrders() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/orders"),
      false
    );
    setOrders([...response.data.data]);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleVerify = async (e: React.FormEvent, authority: any) => {
    //تایید تراکنش بصورت دستی
    e.preventDefault();
    const response = await call(
      axios.get(SERVER_API + `/pay/verify?Authority=${authority}`),
      true
    );
    loadOrders();
  };

  const handleInquiry = async (e: React.FormEvent, authority: any) => {
    //استعلام تراکنش
    e.preventDefault();
    const response = await call(
      axios.get(SERVER_API + `/pay/inquiry?Authority=${authority}`),
      true
    );
  };

  return (
    <>
      <main className="pt-15">
        <div className="client-orders-page-container flex flex-col gap-5">
          <h1>all orders page</h1>
          <div>
            <table>
              <caption>لیست سفارش های شما</caption>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>قیمت کل</th>
                  <th>وضعیت</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any, index: any) => {
                  return (
                    <tr key={index} className="border">
                      <td>{order._id}</td>
                      <td>{order.totalPrice} تومان</td>
                      <td>
                        <OrderStatus order={order}></OrderStatus>
                        {order.authority !== "" && (
                          <p>شناسه پرداخت : {order.authority}</p>
                        )}
                        {order.referenceId !== "" && (
                          <p>کد رهگیری : {order.referenceId}</p>
                        )}
                      </td>
                      <td className="flex flex-row gap-2">
                        {order.authority !== "" && (
                          <>
                            <form>
                              <button
                                className="p-2 bg-red-500 border"
                                onClick={(e) =>
                                  handleVerify(e, order.authority)
                                }
                              >
                                اعتبار سنجی
                              </button>
                            </form>
                            <form>
                              <button
                                className="p-2 bg-red-500 border"
                                onClick={(e) =>
                                  handleInquiry(e, order.authority)
                                }
                              >
                                استعلام
                              </button>
                            </form>
                          </>
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
export default OrdersPage;
