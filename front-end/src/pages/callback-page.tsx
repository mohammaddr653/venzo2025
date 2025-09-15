import { useEffect, useState } from "react";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import callManager from "../hooks/callManager";
import { SERVER_API } from "../../config";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

const CallbackPage = () => {
  const { user } = useUserStore();
  const [reservedProducts, setReservedProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { call, loading } = callManager();
  const [allParams] = useSearchParams();
  const [info, setInfo] = useState<any>({ code: null, data: null });
  const [order, setOrder] = useState<any>({});

  async function loadOrder() {
    const response = await call(
      axios.get(SERVER_API + `/orders/${info.data}`),
      false
    );
    setOrder({ ...response.data.data });
  }

  useEffect(() => {
    setInfo({ code: allParams.get("code"), data: allParams.get("data") });
  }, [allParams]);

  useEffect(() => {
    if (info.code === "200" && info.data !== "undefined" && info.data)
      loadOrder();
  }, [info]);

  return (
    <>
      <main className="pt-15">
        <div className="callback-page-container flex flex-col gap-5">
          <h1>callback page</h1>
          {info.code === "404" && (
            <h4>متاسفانه سفارش شما یافت نشد . اگر مبلغی از حسابتان برداشت شده بطور خودکار به حساب باز میگردد</h4>
          )}
          {info.code === "400" && <h4>تراکنش ناموفق بود</h4>}
          {info.code === "500" && (
            <h4>
              به علت کندی اینترنت امکان تایید تراکنش وجود نداشت ، لطفا با
              پشتیبانی تماس حاصل فرمایید
            </h4>
          )}
          {info.code === "401" && <h4>تراکنش تایید نشد</h4>}
          {info.code === "101" && <h4>تراکنش قبلا تایید شده</h4>}
          {info.code === "200" && (
            <>
              <h4>سفارش شما تایید شد . از خریدتان متشکریم .</h4>
              <h4>شناسه تراکنش : {order.referenceId}</h4>
            </>
          )}
        </div>
      </main>
    </>
  );
};
export default CallbackPage;
