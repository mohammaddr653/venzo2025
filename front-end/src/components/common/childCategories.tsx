import { Link } from "react-router-dom";
import Img from "./img";
import "../../assets/css/childCategories.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";

const ChildCategories = ({ childCats, categoryId }: any) => {
  return (
    <div className="childCategories-container px-5 md:px-20">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        initialSlide={0}
        className="mySwiper"
      >
        <div className="swiperjs-controlls">
          <SwiperButtonPrev></SwiperButtonPrev>
          <SwiperButtonNext></SwiperButtonNext>
        </div>
        {childCats.map((item: any, index: any) => {
          if (item.motherId === categoryId) {
            return (
              <SwiperSlide className="max-w-[200px]">
                <Link
                  key={index}
                  to={`/shop/${item._id}`}
                  className=" rounded-md w-full flex flex-col justify-between border overflow-hidden border-neutral-300 p-2 gap-2 items-center"
                >
                  <Img
                    pic={item.img}
                    sizes={"500px"}
                    className={"object-cover w-full border border-neutral-300"}
                  ></Img>
                  <h3 className="text-size15">{item.name}</h3>
                </Link>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default ChildCategories;
