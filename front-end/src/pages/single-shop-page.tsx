import Header from "../components/common/header";
import useSingleShopLog from "../hooks/logics/useSingleShopLog";
import Footer from "../components/common/footer";
import SingleShopGallery from "../components/common/singleShop-gallery";
import TitleRight from "../components/common/title-right";
import NonSelectivePropertiesGrid from "../components/common/non-selective-properties-grid";
import SelectiveProperties from "../components/common/selective-properties";

const SingleShopPage = () => {
  const {
    product,
    priceAndStock,
    formData,
    handleSelectProperty,
    handleAddToCart,
    selectedPropertyvalString,
  } = useSingleShopLog();

  return (
    <>
      <Header></Header>
      <main className="pt-20 pb-15">
        <div className="singleShopPage-container">
          <div className="flex flex-col md:flex-row gap-10 px-5 md:px-20">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <i className="bi bi-heart text-size24"></i>
              </div>
              <SingleShopGallery product={product}></SingleShopGallery>
            </div>
            <div className=" w-full flex flex-col gap-10">
              <TitleRight title={product?.name}></TitleRight>
              <NonSelectivePropertiesGrid
                product={product}
              ></NonSelectivePropertiesGrid>
              <div className="mt-auto flex flex-col gap-4">
                <SelectiveProperties
                  product={product}
                  formData={formData}
                  selectedPropertyvalString={selectedPropertyvalString}
                  handleSelectProperty={handleSelectProperty}
                ></SelectiveProperties>
                <div className=" flex flex-col gap-2 items-end">
                  <div className="flex flex-row gap-1 items-center flex-nowrap">
                    <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                      {priceAndStock.price}
                    </span>
                    <span className="text-neutral-700 text-size14">تومان</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-lime-600 text-white text-shadow-lg rounded-lg px-4 py-2"
                  >
                    افزودن به سبد
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="singleShopPage-container bg-green-300">
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
        </div> */}
      </main>
      <Footer></Footer>
    </>
  );
};
export default SingleShopPage;
