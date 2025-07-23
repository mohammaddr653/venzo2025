import { Link } from "react-router-dom";

const ChildCategories = ({ childCats, categoryId }: any) => {
  return (
    <div className="flex flex-row px-5 md:px-20 pt-10">
      {childCats.map((item: any, index: any) => {
        if (item.motherId === categoryId) {
          return (
            <Link
              key={index}
              to={`/shop/${item._id}`}
              className="border border-neutral-300 rounded-md w-[150px] h-[150px] flex justify-center items-center"
            >
              {item.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default ChildCategories;
