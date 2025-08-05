import { Link } from "react-router-dom";

const MenuItem = ({ item, categories }: any) => {
  return (
    <li className={item.display}>
      <div className="head">
        {item.type === "shop" && (
          <Link to={`/shop/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "archive" && (
          <Link to={`/archive/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "box" && <h4>{item.name}</h4>}
        {item.type === "link" && <Link to={item.link}>{item.name}</Link>}
      </div>
      {categories?.length &&
        categories.some((category: any) => category.motherId === item._id) && (
          <div className="childs">
            <ul>
              {categories.map((category: any, index: any) => {
                if (category.motherId === item._id) {
                  return (
                    <MenuItem
                      item={category}
                      categories={categories}
                    ></MenuItem>
                  );
                }
              })}
            </ul>
          </div>
        )}
    </li>
  );
};

export default MenuItem;
