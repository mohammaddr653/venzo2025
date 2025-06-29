import { useEffect } from "react";
import useLoadProducts from "../../hooks/useLoadProducts";
import { Link } from "react-router-dom";
import { DEFAULT_PRODUCT, SERVER_URL } from "../../../config";
import "../../assets/css/products-archive.css";
import TitleCentral from "./title-central";

const ProductsArchive = () => {
  const { products, loadProducts } = useLoadProducts();
  useEffect(() => {
    loadProducts();
  }, []);
  return products?.length ? (
    <div>
      <div className="py-10">
        <TitleCentral
          title={"جدیدترین محصولات"}
          class={"text-size24 text-neutral-600 font-weight300 text-nowrap"}
        ></TitleCentral>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: any, index: any) => {
          return (
            <div className="flex flex-col gap-1.5" key={index}>
              <div className="flex flex-row gap-1 h-2.5">
                {product?.properties
                  .find((property: any) => property.type === "color")
                  ?.values.map((color: any, index: any) => {
                    return color.hex ? (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#" + color.hex.toString(),
                        }}
                        className="h-full aspect-square rounded-full border border-neutral-300"
                      ></span>
                    ) : null;
                  })}
              </div>
              <Link
                to={`/single-shop/${product._id}`}
                key={index}
                className="product-card rounded-xl border-neutral-200 border overflow-hidden hover:shadow-card-neutral transition-shadow duration-300"
              >
                <div className=" main-part w-full flex flex-col justify-start items-center h-full">
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={
                        product.img ? SERVER_URL + product.img : DEFAULT_PRODUCT
                      }
                      className="product-img relative aspect-284/170 object-cover w-full z-0"
                      alt=""
                    />
                  </div>
                  <div className="relative overflow-hidden w-full grow">
                    <div className="relative flex flex-col items-center gap-4 h-full py-4 z-10">
                      <p className="px-4">پاپوش پودایران طرح خالدار قرمز</p>
                      <p className="px-4 text-size14 text-justify text-neutral-600">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                      <div className="mt-auto px-4 flex flex-row gap-1 w-full justify-between items-center flex-wrap-reverse">
                        <button
                          className="add-to-card border"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("clicked");
                          }}
                        >
                          خرید
                        </button>
                        <p className=" text-primary font-weight300 text-size17 flex flex-row gap-1 items-center">
                          <span className="">{product.price}</span>
                          <span className="text-size14">تومان</span>
                        </p>
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
        })}
      </div>
    </div>
  ) : null;
};
export default ProductsArchive;
