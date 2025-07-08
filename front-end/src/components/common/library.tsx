import { useEffect } from "react";
import useLoadMedias from "../../hooks/useLoadMedias";
import { SERVER_URL } from "../../../config";

interface LibraryProps {
  libShow: boolean;
  setLibShow: any;
  selectedImgs: any; //useState with an empty array as intial val
  setSelectedImgs: any;
}

const Library = (props: LibraryProps) => {
  const { medias, loadMedias } = useLoadMedias();

  useEffect(() => {
    loadMedias();
  }, []);

  const handleSelect = (media: any) => {
    props.setSelectedImgs((prev: any) => {
      const exist = prev.includes(media.media);
      if (exist) {
        return [...prev.filter((item: any) => item !== media.media)];
      } else {
        return [...prev, media.media];
      }
    });
  };

  return (
    <>
      <div
        className="library-overlay fixed w-full h-full z-10 top-0 right-0 bg-glass-shadow"
        onClick={() => props.setLibShow(false)}
      ></div>
      <div className="bg-pink-400 border fixed w-[90vw] h-[90vh] rounded-lg top-[5vh] right-[5vw] z-20">
        <div>
          {medias?.map((media: any, index: any) => {
            return (
              <div
                onClick={() => handleSelect(media)}
                className="w-[100px] relative"
              >
                <img
                  src={SERVER_URL + media.media}
                  alt=""
                  className="aspect-square object-cover"
                  width={100}
                />
                {props.selectedImgs.includes(media.media) ? (
                  <span className="flex absolute top-0 left-0 bg-red-500 w-[5px] aspect-square"></span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Library;
