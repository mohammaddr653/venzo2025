const OrdinaryFilterBox = ({
  item,
  appliedQueries,
  handleFilterCheck,
}: any) => {
  return (
    <div className="flex flex-col gap-1 ms-1">
      {item?.values.length
        ? item.values.map((val: any, index: any) => {
            return (
              <label
                key={index}
                className="flex flex-row gap-1 cursor-pointer items-center text-neutral-900 text-size14"
              >
                <input
                  type="checkbox"
                  name="selective"
                  value={val.propertyval?._id}
                  checked={
                    appliedQueries[
                      `attributes[${item.property._id}]`
                    ]?.includes(val.propertyval?._id)
                      ? true
                      : false
                  }
                  onChange={(e) => handleFilterCheck(e, item.property._id)}
                />
                {val.propertyval.value}
              </label>
            );
          })
        : null}
    </div>
  );
};

export default OrdinaryFilterBox;
