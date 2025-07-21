//this function get the array of products and apply filters on them and returns the new array .

const applyFilters = (req, products) => {
  const newProductArr = products.filter((item) => {
    let status = false;
    for (const filter of Object.keys(req.query.attributes)) {
      const haveFilter = item.properties.find(
        (property) => property.nameString === filter
      );
      if (haveFilter) {
        const haveValue = haveFilter.values.find((propertyval) =>
          req.query.attributes[filter].includes(propertyval.valueString)
        );
        if (haveValue) {
          status = true;
        } else {
          status = false;
          break;
        }
      } else {
        status = false;
        break;
      }
    }
    return status;
  });
  return newProductArr;
};

module.exports = applyFilters;
