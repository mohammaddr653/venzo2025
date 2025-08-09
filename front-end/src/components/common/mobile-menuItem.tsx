import { Link } from "react-router-dom";

const MobMenuItem = ({ item, categories }: any) => {
  //بررسی شرط وجود فرزند
  const condition =
    categories?.length &&
    categories.some((category: any) => category.motherId === item._id);

  return (
    <li className={`${item.display} ps-2`}>
      <div className={`head flex flex-row items-center justify-between ${!condition&&"font-weight200"}`}>
        {item.type === "shop" && (
          <Link to={`/shop/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "archive" && (
          <Link to={`/archive/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "box" && <h4>{item.name}</h4>}
        {item.type === "link" && <Link to={item.link}>{item.name}</Link>}
        {condition && <i className="bi bi-chevron-left"></i>}
      </div>
      {condition && (
        <div className="childs">
          <ul>
            {categories.map((category: any, index: any) => {
              if (category.motherId === item._id) {
                return (
                  <MobMenuItem
                    key={category._id}
                    item={category}
                    categories={categories}
                  ></MobMenuItem>
                );
              }
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default MobMenuItem;

