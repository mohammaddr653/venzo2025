import { useSwiper } from "swiper/react";

const SwiperButtonPrev = ({className}:any) => {
  const swiper = useSwiper();
  return (
    <button className={`swiper-prev ${className}`} onClick={() => swiper.slidePrev()}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};
export default SwiperButtonPrev;
