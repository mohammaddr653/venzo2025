import { Link } from "react-router-dom";

const DeskMenuItem = ({ item, categories, focus, setFocusState }: any) => {
  function handleHover(item: any, value: boolean) {
    if (item.display === "mega-menu" && item.motherId === "root") {
      setFocusState(value);
    }
  }
  return (
    <li
      className={item.display}
      onMouseEnter={() => handleHover(item, true)}
      onMouseLeave={() => handleHover(item, focus)}
    >
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
                    <DeskMenuItem
                      key={category._id}
                      item={category}
                      categories={categories}
                    ></DeskMenuItem>
                  );
                }
              })}
            </ul>
          </div>
        )}
    </li>
  );
};

export default DeskMenuItem;
