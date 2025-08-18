import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "../../assets/css/items-slideshow.css";

import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { useEffect } from "react";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";
import Img from "./img";

function ItemsSlideshow() {
  return (
    <div className="border border-neutral-200 lg:border-0 lg:py-20 lg:px-10 items-slideshow-container lg:bg-[url(/images/pexels-dada-_design-240566386-17271985.jpg)] lg:border lg:border-neutral-primary bg-cover bg-no-repeat bg-bottom w-full rounded-lg flex items-center justify-center lg:justify-end">
      <div className=" w-full lg:w-[500px] relative">
        <Swiper
          className=""
          modules={[Autoplay, Pagination, Navigation, Scrollbar, A11y]}
          initialSlide={0}
          loop={true}
          spaceBetween={"10px"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2.3,
            },
            576: {
              slidesPerView: 3.3,
            },
            768: {
              slidesPerView: 4.3,
            },
            992: {
              slidesPerView: 2,
            },
          }}
        >
          {/* note: استایل این دکمه ها رو با تیلویند بده تا جایی که میشه */}
          <div className="swiperjs-controlls flex justify-end w-full items-center gap-2 absolute top-full h-[20px] mt-[20px] z-10 text-black">
            <SwiperButtonPrev
              className={
                "hidden cursor-pointer lg:flex w-[30px] bg-white aspect-square justify-center items-center rounded-full"
              }
            ></SwiperButtonPrev>
            <SwiperButtonNext
              className={
                "hidden cursor-pointer lg:flex w-[30px] bg-white aspect-square justify-center items-center rounded-full"
              }
            ></SwiperButtonNext>
          </div>

          <SwiperSlide>
            <div className="blur-layer absolute rounded-lg w-full h-full z-0 "></div>
            <div className="relative w-full bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow z-10">
              <div className="bg-linear-to-t from-[#00000057] to-transparent flex flex-col justify-end h-full">
                <div className="flex justify-between p-4 items-center text-white">
                  <div className="flex flex-col gap-2">
                    <h4>لامپ</h4>
                    <p className="text-size13 font-weight100">23 محصول</p>
                  </div>
                  <i className="bi bi-arrow-left"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="blur-layer absolute rounded-lg w-full h-full z-0"></div>
            <div className="relative w-full bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow z-10">
              <div className="bg-linear-to-t from-[#00000057] to-transparent flex flex-col justify-end h-full">
                <div className="flex justify-between p-4 items-center text-white">
                  <div className="flex flex-col gap-2">
                    <h4>لامپ</h4>
                    <p className="text-size13 font-weight100">23 محصول</p>
                  </div>
                  <i className="bi bi-arrow-left"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="blur-layer absolute rounded-lg w-full h-full z-0"></div>
            <div className="relative w-full bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow z-10">
              <div className="bg-linear-to-t from-[#00000057] to-transparent flex flex-col justify-end h-full">
                <div className="flex justify-between p-4 items-center text-white">
                  <div className="flex flex-col gap-2">
                    <h4>لامپ</h4>
                    <p className="text-size13 font-weight100">23 محصول</p>
                  </div>
                  <i className="bi bi-arrow-left"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default ItemsSlideshow;
