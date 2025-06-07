import { SERVER_URL } from "../../../config";

const HomeBanner = () => {
    return (
      <img
        src={
          SERVER_URL +
          "/uploads/images/banner/living-room-1920x1080-autumn-vibe-fireplace-267841.jpg"
        }
        alt=""
        className="w-full rounded-xl"
      />
    );
};
export default HomeBanner;
