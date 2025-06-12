import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLoadBanners from "../../hooks/useLoadBanners";
import { SERVER_URL } from "../../../config";

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
            <img
              src={SERVER_URL + banner.image}
              className="w-full aspect-1353/555 object-cover"
              alt="little-banner"
            />
          </Link>
        ) : null;
      })}
    </div>
  ) : null;
};
export default HomeLittleBanner;
