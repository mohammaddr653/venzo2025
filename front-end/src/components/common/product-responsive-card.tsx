import { Link } from "react-router-dom";
import Img from "./img";
import { useEffect, useRef, useState } from "react";
import "../../assets/css/product-card.css";
import PriceUnit from "./priceUnit";
import Offpercent from "./offpercent";
import { createPriceAndStockObj } from "../../helpers/createPriceAndStockObj";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "../../types/objects/properties";
import CartPlusSvg from "../icons/cart-plus-svgrepo-com";
import HeartSvg from "../icons/heart-svg";

interface ProductCardProps {
  product: any;
}

const ProductResponsiveCard = ({ product }: ProductCardProps) => {
  const [priceAndStock, setPriceAndStock] = useState<any>({
    price: null,
    discount: null,
    percent: null,
    stock: null,
  });

  function handlePriceAndStock() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    if (selectiveProperty) {
      let lowest = null;

      for (let propertyval of selectiveProperty.values) {
        if (lowest) {
          const existingConfig = lowest.discount?.offer ?? lowest.price;
          const newConfig = propertyval.discount?.offer ?? propertyval.price;
          if (newConfig < existingConfig) {
            lowest = propertyval;
          }
        } else {
          lowest = propertyval;
        }
        const priceAndStockObj = createPriceAndStockObj(lowest);
        setPriceAndStock({ ...priceAndStockObj });
      }
    } else {
      const priceAndStockObj = createPriceAndStockObj(product);
      setPriceAndStock({ ...priceAndStockObj });
    }
  }

  useEffect(() => {
    if (product) {
      handlePriceAndStock();
    }
  }, [product]);

  return (
    <div className="flex flex-col gap-1.5 h-full">
      <Link
        to={`/single-shop/${product._id}`}
        className="product-card rounded-xl border-neutral-200 border overflow-hidden hover:shadow-card-neutral transition-shadow duration-300"
      >
        <div className=" main-part w-full flex flex-row sm:flex-col justify-start items-center h-full">
          <div className="relative h-full sm:h-auto w-full p-2">
            <div className=" h-full sm:h-auto w-full relative overflow-hidden rounded-xl">
              <div className="flex absolute justify-between items-center top-0 right-0 rounded-xl w-full p-2 px-2.5 z-10">
                <div className="flex flex-row gap-1">
                  {product?.properties
                    .find(
                      (property: ProductPropertiesObj) =>
                        property.property.type === "color"
                    )
                    ?.values.map(
                      (color: ProductPropertyvalsObj, index: any) => {
                        return color.propertyval?.hex ? (
                          <span
                            key={index}
                            style={{
                              backgroundColor:
                                "#" + color.propertyval.hex.toString(),
                            }}
                            className="h-4.5 aspect-square rounded-full border-2 border-white outline-1 outline-[#444] inset-full-444"
                          ></span>
                        ) : null;
                      }
                    )}
                </div>
                <div>
                  <HeartSvg></HeartSvg>
                </div>
              </div>

              <Img
                pic={product?.img}
                sizes={"500px"}
                className={
                  "product-img relative aspect-284/170 object-cover h-full sm:h-auto sm:w-full  z-0"
                }
              ></Img>
            </div>
          </div>
          <div className="relative overflow-hidden w-full grow">
            <div className="relative flex flex-col justify-between items-center gap-4 min-h-[150px] py-4 z-10">
              <p className="px-4 w-full sm:w-auto">{product?.name}</p>
              <div className="mt-auto px-4 flex flex-row gap-1 w-full justify-between items-end flex-nowrap">
                <CartPlusSvg color={"#525252"}></CartPlusSvg>
                <div className="flex flex-col items-end">
                  {priceAndStock.discount ? (
                    <>
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-nowrap align-middle line-through text-neutral-600 text-size14">
                          {priceAndStock.price}
                        </span>
                        <Offpercent
                          percent={priceAndStock.percent}
                        ></Offpercent>
                      </div>
                      <div className="flex flex-row gap-1 items-center flex-nowrap">
                        <span className="text-neutral-900  text-size17 sm:text-size24 font-weight300 text-nowrap">
                          {priceAndStock.discount.offer}
                        </span>
                        <PriceUnit></PriceUnit>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-1 items-center flex-nowrap">
                      <span className="text-neutral-900 text-size17 sm:text-size24 font-weight300 text-nowrap">
                        {priceAndStock.price}
                      </span>
                      <PriceUnit></PriceUnit>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <img
              src="/images/icons/jk4377d2c3969965e3b8e7e7dcdfc0be536.png"
              alt=""
              width={150}
              className="pattern-part object-cover absolute bottom-0 right-0 opacity-[0.05] z-0"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductResponsiveCard;
