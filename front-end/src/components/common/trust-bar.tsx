import { useEffect } from "react";
import useLoadTrusts from "../../hooks/useLoadTrusts";
import { SERVER_URL } from "../../../config";
import Img from "./img";

const TrustBar = () => {
  const { trusts, loadTrusts } = useLoadTrusts();

  useEffect(() => {
    loadTrusts();
  }, []);
  return (
    <>
      {trusts?.length ? (
        <div className="flex flex-row lg:gap-10 flex-wrap [&>*]:grow">
          {trusts.map((trust: any, index: any) => {
            return trust.show ? (
              <div
                className=" flex flex-col items-center justify-start rounded-xl py-3 gap-3 basis-36"
                key={index}
              >
                <div className="flex flex-col items-center gap-1">
                  <Img
                    pic={trust?.image}
                    sizes={"500px"}
                    className={"aspect-square object-cover"}
                    width={80}
                  ></Img>
                  <h3 className="text-size14 font-weight300 text-neutral-500">
                    {trust.title}
                  </h3>
                </div>
                <p className="text-size14 hidden md:block font-weight200 text-cu-neutral-800 text-justify">
                  {trust.caption}
                </p>
              </div>
            ) : null;
          })}
        </div>
      ) : null}
    </>
  );
};
export default TrustBar;
