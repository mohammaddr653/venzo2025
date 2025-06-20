import Header from "../components/common/header";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import useSingleShopLog from "../hooks/logics/useSingleShopLog";
import Footer from "../components/common/footer";

const SingleShopPage = () => {
  const {
    product,
    priceAndStock,
    formData,
    handleSelectProperty,
    handleAddToCart,
    user,
  } = useSingleShopLog();

  return (
    <>
      <Header></Header>
      <main className="pt-17 pb-15">
        <div className="singleShopPage-container bg-green-300">
          <img
            src={product?.img ? SERVER_URL + product?.img : DEFAULT_PRODUCT}
            alt=""
            className="aspect-square object-cover"
            width={100}
          />
          <p>{product?.name}</p>
          <p>{priceAndStock.price}</p>
          <p>{priceAndStock.stock}</p>
          {product?.properties.length
            ? product.properties.map((property: any, index: any) => {
                if (property.selective) {
                  return (
                    <form key={index}>
                      <h4>انتخاب {property.nameString}</h4>
                      {property.values.map((propertyval: any, index: any) => {
                        return (
                          <label key={index}>
                            <input
                              type="radio"
                              name="selectiveProperty"
                              value={propertyval.value.toString()}
                              checked={
                                formData.selectedPropertyvalString.includes(
                                  propertyval.value.toString()
                                )
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleSelectProperty(e)}
                            />
                            {propertyval.valueString}
                          </label>
                        );
                      })}
                    </form>
                  );
                }
              })
            : null}
          <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
          {product?.properties.some((obj: any) => !obj.selective) ? (
            <ul>
              {product.properties
                .filter((obj: any) => !obj.selective)
                .map((property: any, index: any) => {
                  return (
                    <li key={index} className="flex flex-row gap-4">
                      <span>{property.nameString}</span>
                      <div className="flex flex-row gap-1">
                        {property.values.map((propertyval: any, index: any) => {
                          return (
                            <span key={index}>{propertyval.valueString}</span>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
            </ul>
          ) : null}
          <button onClick={() => handleAddToCart(product._id)}>
            افزودن به سبد خرید
          </button>
        </div>
      </main>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <div className="p-2"></div>
      <Footer></Footer>
    </>
  );
};
export default SingleShopPage;
