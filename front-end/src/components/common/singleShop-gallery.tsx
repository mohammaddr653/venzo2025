import { useEffect, useState } from "react";
import Img from "./img";
import GallerySvg from "../icons/gallery-svg";
import ThreeDotsSvg from "../icons/three-dots-svg";
import GallerySlider from "./gallerySlider";

interface SingleShopGalleryProps {
  product: any;
}

const SingleShopGallery = ({ product }: SingleShopGalleryProps) => {
  const [clickedImg, setClickedImg] = useState(null);
  const [galleryShow, setGalleryShow] = useState(false);

  useEffect(() => {
    if (product?.img) {
      product.gallery.unshift(product.img);
      setClickedImg({ ...product.img });
    }
  }, [product]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative group">
        <Img
          pic={clickedImg}
          sizes={"500px"}
          className="aspect-square object-cover w-full"
        ></Img>
        <button
          onClick={() => setGalleryShow(true)}
          className="cursor-pointer absolute w-full h-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-300 justify-center items-center top-0 bg-glass-shadow"
        >
          <GallerySvg width={50} fill={"white"}></GallerySvg>
        </button>
      </div>
      <div className=" flex flex-row justify-center p-2 gap-1 rounded-md border border-neutral-300">
        {product?.gallery.length
          ? product.gallery.slice(0, 5).map((image: any, index: any) => {
              return (
                <button
                  className="relative max-w-[50px] rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setClickedImg({ ...image })}
                >
                  <Img
                    pic={image}
                    sizes={"70px"}
                    className="aspect-square object-cover w-full"
                    key={index}
                  ></Img>
                  {4 < product.gallery.length - 1 && index === 4 ? (
                    <div
                      onClick={() => setGalleryShow(true)}
                      className=" flex justify-center items-center absolute top-0 w-full h-full bg-transparent backdrop-blur-xs"
                    >
                      <ThreeDotsSvg width={20} fill={"white"}></ThreeDotsSvg>
                    </div>
                  ) : null}
                </button>
              );
            })
          : null}
      </div>
      {galleryShow && product?.gallery.length ? (
        <div className="fixed top-0 z-[60] w-full h-full right-0 flex justify-center items-center">
          <div
            onClick={() => setGalleryShow(false)}
            className="w-full z-[61] h-full bg-glass-shadow absolute right-0 "
          ></div>
          <div className="relative z-[62] flex justify-center items-center w-[90vw] h-[90vh]">
            <GallerySlider
              object={product?.gallery}
              setGalleryShow={setGalleryShow}
            ></GallerySlider>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleShopGallery;
