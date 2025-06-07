import { useSwiper } from "swiper/react";

const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  return (
    <button className="swiper-prev" onClick={() => swiper.slidePrev()}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};
export default SwiperButtonPrev;
