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
    <div className="relative h-[400px] items-slideshow-container lg:bg-[url(/images/pexels-dada-_design-240566386-17271985.jpg)] lg:border lg:border-neutral-primary bg-cover bg-no-repeat bg-bottom w-full rounded-lg flex items-center">
      <div className="relative h-[300px] lg:px-10 w-full flex items-center justify-center lg:justify-end">
        <div className=" w-full lg:w-[500px] h-full absolute">
          <Swiper
            className=""
            modules={[Autoplay, Pagination, Navigation, Scrollbar, A11y]}
            initialSlide={0}
            pagination={{
              clickable: true,
            }}
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
                slidesPerView: 1.3,
              },
              576: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView: 2.3,
              },
              992: {
                slidesPerView: 2,
              },
            }}
          >
            {/* note: استایل این دکمه ها رو با تیلویند بده تا جایی که میشه */}
            <div className="swiperjs-controlls">
              <SwiperButtonPrev className={"hidden lg:flex"}></SwiperButtonPrev>
              <SwiperButtonNext className={"hidden lg:flex"}></SwiperButtonNext>
            </div>

            <SwiperSlide>
              <div className="item-container p-3 rounded-lg">
                <div className="bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow">
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
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-container p-3 rounded-lg">
                <div className="bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow">
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
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-container p-3 rounded-lg">
                <div className="bg-green-300 bg-[url(/images/pexels-yasin-thamir-506684371-16152262.jpg)] bg-cover bg-top aspect-square rounded-lg overflow-hidden mx-auto shadow-md shadow-glass-shadow">
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
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ItemsSlideshow;
