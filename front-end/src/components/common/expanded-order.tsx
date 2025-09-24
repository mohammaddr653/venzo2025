import React from "react";
import { Link } from "react-router-dom";
import OrderStatus from "./order-status";
import PriceUnit from "./priceUnit";

const ExpandedOrder = ({ selectedOrder, setSelectedOrder }: any) => {
  return (
    <div className="fixed w-screen h-screen top-0 right-0 z-60 flex justify-center items-center">
      <div
        className="bg-glass-shadow w-full h-full absolute top-0 right-0"
        onClick={() => setSelectedOrder(null)}
      ></div>
      <div className="w-[80%] h-[80%] z-10 bg-white flex flex-col justify-start overflow-y-scroll">
        <button
          onClick={() => setSelectedOrder(null)}
          className=" flex w-fit self-end p-5"
        >
          ❌
        </button>
        <div className=" flex flex-col gap-5 justify-center items-start p-5">
          <p>شناسه سفارش : {selectedOrder._id}</p>
          <div className="flex gap-1 items-center">
            <span>وضعیت :</span>
            <OrderStatus order={selectedOrder}></OrderStatus>
          </div>
          <p>
            قیمت کل : {selectedOrder.totalPrice}
            <PriceUnit></PriceUnit>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpandedOrder;
