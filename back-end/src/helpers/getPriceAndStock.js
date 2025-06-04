//this function is used to return the price and stock of a product . this product can have a selective property so the price and stock should read based on the selectedPropertyvalString.
const getPriceAndStock = (selectedPropertyvalString, product) => {
  let price = product.price;
  let stock = product.stock;
  let selectionString = "";

  if (selectedPropertyvalString !== "") {
    const selectiveProperty = product.properties.find(
      (property) => property.selective
    );
    if (!selectiveProperty) return;
    const selectedPropertyval = selectiveProperty.values.find((propertyval) =>
      selectedPropertyvalString.includes(propertyval.value.toString())
    );
    if (!selectedPropertyval) return;
    selectionString = selectedPropertyval.valueString;
    price = selectedPropertyval.price;
  }

  return { price, stock, selectionString };
};

module.exports = getPriceAndStock;
