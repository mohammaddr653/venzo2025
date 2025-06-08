import { SERVER_URL } from "../../../config";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "../../assets/css/home-banner.css";

import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { useEffect } from "react";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";

const HomeBanner = () => {
  return (
    <div className="home-banner-container relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Pagination, Scrollbar, A11y]}
        initialSlide={0}
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
        <SwiperSlide>
          <img
            src={
              SERVER_URL +
              "/uploads/images/banners/living-room-1920x1080-autumn-vibe-fireplace-267841.jpg"
            }
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              SERVER_URL +
              "/uploads/images/banners/living-room-1920x1080-autumn-vibe-fireplace-267841.jpg"
            }
            alt=""
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default HomeBanner;
