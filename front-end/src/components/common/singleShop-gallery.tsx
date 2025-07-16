import { DEFAULT_PRODUCT, SERVER_URL } from "../../../config";

interface SingleShopGalleryProps {
  product: any;
}

const SingleShopGallery = (props: SingleShopGalleryProps) => {
  return (
    <div>
      <img
        src={
          props.product?.img ? SERVER_URL + props.product?.img.media : DEFAULT_PRODUCT
        }
        alt=""
        className="aspect-square object-cover"
        width={700}
      />
    </div>
  );
};

export default SingleShopGallery;
