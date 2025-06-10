const HeroCard = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <img
        src="/images/icons/d0i713732ffa55576e36d0dd32dd1c74068.png"
        width={350}
        alt="kitchen-png"
      />
      <p className="flex flex-row items-center gap-1 text-size24 font-weight400 text-cu-neutral-400 text-shadow-md">
        <span> قلب خانه را زیبا کن</span>
        <span>
          <img src="/images/icons/icons8-heart-32.png" width={30} alt="" />
        </span>
      </p>
    </div>
  );
};
export default HeroCard;
