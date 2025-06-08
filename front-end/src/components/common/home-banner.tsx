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
import useLoadBanners from "../../hooks/useLoadBanners";

const HomeBanner = () => {
  const { banners, loadBanners } = useLoadBanners();

  useEffect(() => {
    loadBanners();
  }, []);
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
        {banners.length
          ? banners.map((banner: any, index: any) => {
              return banner.show ? (
                <SwiperSlide>
                  <img
                    src={SERVER_URL + banner.image}
                    alt="banner-image"
                    className="w-full aspect-1353/555 object-cover object-center"
                  />
                </SwiperSlide>
              ) : null;
            })
          : null}
      </Swiper>
    </div>
  );
};
export default HomeBanner;
