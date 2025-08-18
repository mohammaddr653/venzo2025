import { useSwiper } from "swiper/react";

const SwiperButtonNext = ({ className }: any) => {
  const swiper = useSwiper();
  return (
    <button
      className={`swiper-next ${className}`}
      onClick={() => swiper.slideNext()}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};
export default SwiperButtonNext;
