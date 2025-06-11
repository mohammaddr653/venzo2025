import { Link } from "react-router-dom";

const HomeLittleBanner = () => {
  return (
    <div className="flex flex-row gap-2">
      <Link to={"/"} className="overflow-hidden w-full bg-amber-600 rounded-xl">
        <img
          src="/images/1000020138.jpg"
          className="w-full aspect-1353/555 object-cover"
          alt=""
        />
      </Link>
      <Link to={"/"} className="overflow-hidden w-full bg-amber-600 rounded-xl">
        <img
          src="/images/1000020138.jpg"
          className="w-full aspect-1353/555 object-cover"
          alt=""
        />
      </Link>
      <Link to={"/"} className="overflow-hidden w-full bg-amber-600 rounded-xl hidden md:flex">
        <img
          src="/images/1000020138.jpg"
          className="w-full aspect-1353/555 object-cover"
          alt=""
        />
      </Link>
    </div>
  );
};
export default HomeLittleBanner;
