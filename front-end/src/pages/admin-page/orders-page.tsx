import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import callManager from "../../hooks/callManager";
import { SERVER_API } from "../../../config";
import axios from "axios";

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

  const handleSubmit = async (e: React.FormEvent, orderId: any) => {
    e.preventDefault();
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/orders/${orderId}`),
      true
    );
    loadOrders();
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
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice} تومان</td>
                      <td>
                        {order.status === "paid" && <p>پرداخت شده</p>}
                        {order.status === "canceled" && <p>پرداخت نشده</p>}
                        {order.status === "pending" && <p>در حال پرداخت</p>}
                      </td>
                      <td>
                        {order.status === "canceled" && (
                          <form>
                            <button
                              className="p-2 bg-red-500 border"
                              onClick={(e) => handleSubmit(e, order._id)}
                            >
                              حذف
                            </button>
                          </form>
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
