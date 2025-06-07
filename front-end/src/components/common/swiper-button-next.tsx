import { useSwiper } from "swiper/react";

const SwiperButtonNext = () => {
  const swiper = useSwiper();
  return (
    <button
      className="swiper-next"
      onClick={() => swiper.slideNext()}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};
export default SwiperButtonNext;
