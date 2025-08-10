const ColorFilterBox = ({ item, appliedQueries, handleFilterCheck }: any) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 ms-1">
      {item?.values.length &&
        item.values.map((val: any, index: any) => {
          return (
            <label
              key={index}
              className="flex flex-row cursor-pointer gap-1 items-center text-neutral-900 text-size14"
            >
              <input
                type="checkbox"
                name="selective"
                value={val.propertyval?._id}
                className="hidden"
                checked={
                  appliedQueries[`attributes[${item.property._id}]`]?.includes(
                    val.propertyval?._id
                  )
                    ? true
                    : false
                }
                onChange={(e) => handleFilterCheck(e, item.property._id)}
              />
              {val.propertyval?.hex && (
                <span
                  style={{
                    backgroundColor: "#" + val.propertyval.hex.toString(),
                  }}
                  className={`w-5 h-5 aspect-square rounded-full ${
                    appliedQueries[
                      `attributes[${item.property._id}]`
                    ]?.includes(val.propertyval?._id) &&
                    "border-2 border-white outline-2 outline-green-600"
                  }`}
                ></span>
              )}
            </label>
          );
        })}
    </div>
  );
};

export default ColorFilterBox;
