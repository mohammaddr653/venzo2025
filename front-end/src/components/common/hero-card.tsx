import { Link } from "react-router-dom";

const HeroCard = () => {
  return (
    <Link
      to={"/shop"}
      className="bg-[url(/images/paper-background.jpg)] bg-cover rounded-xl relative h-full w-full flex flex-col items-center gap-4 p-4"
    >
      <img
        src="/images/icons/d0i713732ffa55576e36d0dd32dd1c74068.png"
        width={350}
        className="hidden lg:block"
        alt="kitchen-png"
      />
      <p className="flex flex-row items-center gap-1 text-size24 font-weight400 text-cu-neutral-400 text-shadow-md">
        <span> قلب خانه را زیبا کن</span>
        <span>
          <img
            src="/images/icons/icons8-heart-32.png"
            className="animate-bounce"
            width={30}
            alt="heart-icon"
          />
        </span>
      </p>
      <p className="hidden lg:flex flex-row items-center gap-1  absolute top-0 left-0 text-size13 p-2 px-4 text-cu-neutral-400">
        <span>فروشگاه</span>
        <i className="bi bi-arrow-left"></i>
      </p>
    </Link>
  );
};
export default HeroCard;
