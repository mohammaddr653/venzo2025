import { DEFAULT_PRODUCT, SERVER_URL } from "../../../config";
import Img from "./img";

interface SingleShopGalleryProps {
  product: any;
}

const SingleShopGallery = (props: SingleShopGalleryProps) => {
  return (
    <div>
      <Img
        pic={props.product?.img}
        sizes={"500px"}
        className="aspect-square object-cover"
        width={700}
      ></Img>
    </div>
  );
};

export default SingleShopGallery;
