import { useEffect, useState } from "react";
import "../../assets/css/products-archive.css";
import TitleCentral from "./title-central";
import ProductCard from "./product-card";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "../../hooks/callManager";
import "../../assets/css/products-carousel.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";

const OffProductsCarousel = () => {
  const { call, loading } = callManager();
  const [products, setProducts] = useState<any[]>([]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + "/shop/most-products?type=offers"),
      false
    );
    setProducts([...response?.data.data]);
  }

  useEffect(() => {
    load();
  }, []);
  return products?.length ? (
    <div className="products-carousel-container">
      <div className="py-5">
        <TitleCentral
          title={"خرید با تخفیف"}
          class={"text-size24 text-neutral-600 font-weight300 text-nowrap"}
        ></TitleCentral>
      </div>
      <div className="carousel">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          initialSlide={0}
          className="mySwiper"
        >
          <div className="swiperjs-controlls">
            <SwiperButtonPrev></SwiperButtonPrev>
            <SwiperButtonNext></SwiperButtonNext>
          </div>

          {products.map((product: any, index: any) => {
            return (
              <SwiperSlide>
                <ProductCard key={index} product={product}></ProductCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  ) : null;
};
export default OffProductsCarousel;
