//this function is used to return the price and stock of a product . this product can have a selective property so the price and stock should read based on the selectedPropertyvalString.
const getPriceAndStock = (selectedPropertyvalString, product) => {
  let price = product.price;
  let stock = product.stock;
  let selectionString = "";

  if (selectedPropertyvalString !== "") {
    const selectiveProperty = product.properties.find(
      (property) => property.selective
    );
    const selectedPropertyval = selectiveProperty.values.find((propertyval) =>
      selectedPropertyvalString.includes(propertyval.propertyval._id.toString())
    );
    selectionString = selectedPropertyval?.propertyval?.value;
    price = selectedPropertyval.price;
    stock = selectedPropertyval.stock;
  }

  return { price, stock, selectionString };
};

module.exports = getPriceAndStock;
