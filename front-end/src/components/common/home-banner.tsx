import { SERVER_URL } from "../../../config";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "../../assets/css/home-banner.css";

import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { useEffect } from "react";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";
import useLoadBanners from "../../hooks/useLoadBanners";
import Img from "./img";

const HomeBanner = () => {
  const { banners, loadBanners } = useLoadBanners();

  useEffect(() => {
    loadBanners();
  }, []);
  return (
    <div className="home-banner-container relative rounded-xl overflow-hidden">
      {banners.length ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Scrollbar, A11y]}
          initialSlide={0}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 1,
            },
          }}
        >
          <SwiperButtonPrev></SwiperButtonPrev>
          <SwiperButtonNext></SwiperButtonNext>

          {banners.map((banner: any, index: any) => {
            return banner.show && banner.location === "main-banner" ? (
              <SwiperSlide>
                <Img
                  pic={banner?.image}
                  sizes={"500px"}
                  className={
                    "w-full aspect-1353/555 object-cover object-center"
                  }
                ></Img>
              </SwiperSlide>
            ) : null;
          })}
        </Swiper>
      ) : null}
    </div>
  );
};
export default HomeBanner;
