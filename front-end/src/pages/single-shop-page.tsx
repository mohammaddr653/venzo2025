import Header from "../components/common/header";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import useSingleShopLog from "../hooks/logics/useSingleShopLog";
import Footer from "../components/common/footer";
import PropertySelector from "../components/common/propertySelector";

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
          <div className="flex flex-row gap-10 px-5 md:px-20">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <i className="bi bi-heart text-size24"></i>
              </div>
              <div>
                <img
                  src={
                    product?.img ? SERVER_URL + product?.img : DEFAULT_PRODUCT
                  }
                  alt=""
                  className="aspect-square object-cover"
                  width={700}
                />
              </div>
            </div>
            <div className=" w-full flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-size17 font-weight300 text-neutral-900 text-nowrap">
                  {product?.name}
                </h1>
                <span className="bg-neutral-200 w-full h-[0.5px]"></span>
              </div>
              <div className="flex flex-col mt-10">
                {product?.properties.some((obj: any) => !obj.selective) ? (
                  <div className="flex flex-col gap-8">
                    <ul className="grid grid-cols-3 gap-2">
                      {product.properties
                        .filter((obj: any) => !obj.selective)
                        .slice(0, 4)
                        .map((property: any, index: any) => {
                          return (
                            <li
                              key={index}
                              className="flex flex-col bg-neutral-200 rounded-md p-2"
                            >
                              <h5 className="text-neutral-500 text-size14">
                                {property.nameString}
                              </h5>
                              <ul className="flex flex-row gap-1">
                                {property.values.map(
                                  (propertyval: any, index: any) => {
                                    if (index > 1) {
                                      return <li key={index}>...</li>;
                                    }
                                    if (index <= 1) {
                                      if (
                                        index === property.values.length - 1 ||
                                        index === 1
                                      ) {
                                        return (
                                          <li
                                            key={index}
                                            className="flex flex-row gap-0.5 items-center"
                                          >
                                            <h4>{propertyval.valueString}</h4>
                                          </li>
                                        );
                                      } else {
                                        return (
                                          <li
                                            key={index}
                                            className="flex flex-row gap-0.5 items-center"
                                          >
                                            <h4>{propertyval.valueString}</h4>
                                            <span>,</span>
                                          </li>
                                        );
                                      }
                                    }
                                  }
                                )}
                              </ul>
                            </li>
                          );
                        })}
                    </ul>
                    <div className="flex flex-row gap-3 items-center justify-between">
                      <span className="bg-neutral-200 w-full h-[1px]"></span>
                      <button className="flex flex-row gap-2 items-center justify-center text-nowrap border border-neutral-200 rounded-md px-4 py-2 text-neutral-500 text-size14">
                        <span>مشاهده همه ویژگی ها</span>
                        <i className="bi bi-chevron-down text-size13"></i>
                      </button>
                      <span className="bg-neutral-200 w-full h-[1px]"></span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="mt-auto flex flex-col gap-4">
                <div>
                  {product?.properties.length
                    ? product.properties.map((property: any, index: any) => {
                        if (property.selective) {
                          return (
                            <div key={index} className=" flex flex-col gap-2">
                              <h4 className="flex flex-row gap-1">
                                <span className="font-weight300 text-neutral-900">
                                  {property.nameString} :
                                </span>
                                <span>{selectedPropertyvalString}</span>
                              </h4>
                              <form className="selective-property-form flex flex-row flex-wrap gap-4">
                                {property.values.map(
                                  (propertyval: any, index: any) => {
                                    return (
                                      <label key={index}>
                                        <input
                                          type="radio"
                                          name="selectiveProperty"
                                          value={propertyval.value.toString()}
                                          className="hidden property-selector-input"
                                          checked={
                                            formData.selectedPropertyvalString ===
                                            propertyval.value
                                              ? true
                                              : false
                                          }
                                          onChange={(e) =>
                                            handleSelectProperty(
                                              e,
                                              propertyval.valueString
                                            )
                                          }
                                        />
                                        <PropertySelector
                                          propertyval={propertyval}
                                          type={property.type}
                                          formData={formData}
                                        ></PropertySelector>
                                      </label>
                                    );
                                  }
                                )}
                              </form>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
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
