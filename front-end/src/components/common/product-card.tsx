import { Link } from "react-router-dom";
import Img from "./img";
import { useEffect, useRef, useState } from "react";
import PriceUnit from "./priceUnit";
import Offpercent from "./offpercent";
import { createPriceAndStockObj } from "../../helpers/createPriceAndStockObj";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "../../types/objects/properties";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
      <div className="flex flex-row gap-1 h-2.5">
        {product?.properties
          .find(
            (property: ProductPropertiesObj) =>
              property.property.type === "color"
          )
          ?.values.map((color: ProductPropertyvalsObj, index: any) => {
            return color.propertyval?.hex ? (
              <span
                key={index}
                style={{
                  backgroundColor: "#" + color.propertyval.hex.toString(),
                }}
                className="h-full aspect-square rounded-full border border-neutral-300"
              ></span>
            ) : null;
          })}
      </div>
      <Link
        to={`/single-shop/${product._id}`}
        className="product-card rounded-xl border-neutral-200 border overflow-hidden hover:shadow-card-neutral transition-shadow duration-300"
      >
        <div className=" main-part w-full flex flex-col justify-start items-center h-full">
          <div className="relative w-full overflow-hidden">
            <Img
              pic={product?.img}
              sizes={"500px"}
              className={
                "product-img relative aspect-284/170 object-cover w-full z-0"
              }
              width={100}
            ></Img>
          </div>
          <div className="relative overflow-hidden w-full grow">
            <div className="relative flex flex-col justify-between items-center gap-4 min-h-[150px] py-4 z-10">
              <p className="px-4">{product?.name}</p>
              <div className="mt-auto px-4 flex flex-row gap-1 w-full justify-between items-end flex-nowrap">
                <button
                  className="add-to-card border"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("clicked");
                  }}
                >
                  خرید
                </button>
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
                        <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                          {priceAndStock.discount.offer}
                        </span>
                        <PriceUnit></PriceUnit>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-1 items-center flex-nowrap">
                      <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
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
              className="pattern-part object-cover absolute bottom-0 left-0 opacity-[0.05] z-0"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
