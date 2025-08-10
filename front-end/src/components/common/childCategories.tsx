import { Link } from "react-router-dom";
import Img from "./img";

const ChildCategories = ({ childCats, categoryId }: any) => {
  return (
    <div className="flex flex-row px-5 md:px-20 gap-3">
      {childCats.map((item: any, index: any) => {
        if (item.motherId === categoryId) {
          return (
            <Link
              key={index}
              to={`/shop/${item._id}`}
              className=" rounded-md w-[150px] flex flex-col gap-2 items-center"
            >
              <Img
                pic={item.img}
                sizes={"500px"}
                className={"object-cover w-full border border-neutral-300 flex-1"}
              ></Img>
              <h3>{item.name}</h3>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default ChildCategories;
