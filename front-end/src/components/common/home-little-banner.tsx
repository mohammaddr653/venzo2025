import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLoadBanners from "../../hooks/useLoadBanners";
import { SERVER_URL } from "../../../config";
import Img from "./img";

const HomeLittleBanner = () => {
  const { banners, loadBanners } = useLoadBanners();

  useEffect(() => {
    loadBanners();
  }, []);

  return banners?.length ? (
    <div className="flex flex-row gap-2">
      {banners.map((banner: any, index: any) => {
        return banner.show && banner.location === "little-banner" ? (
          <Link
            to={"/"}
            className="overflow-hidden w-full bg-amber-600 rounded-xl"
            key={index}
          >
            <Img
              pic={banner?.image}
              sizes={"500px"}
              className={"w-full aspect-1353/555 object-cover"}
              alt="little-banner"
            ></Img>
          </Link>
        ) : null;
      })}
    </div>
  ) : null;
};
export default HomeLittleBanner;
