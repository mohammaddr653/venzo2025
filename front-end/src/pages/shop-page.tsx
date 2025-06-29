import { Link } from "react-router-dom";
import Header from "../components/common/header";
import { DEFAULT_PRODUCT, SERVER_URL } from "../../config";
import useShopLog from "../hooks/logics/useShopLog";
import Footer from "../components/common/footer";
import PropertySelector from "../components/common/propertySelector";
import ProductCard from "../components/common/product-card";

const ShopPage = () => {
  const { filters, appliedFilters, handleFilterCheck, products } = useShopLog();

  return (
    <>
      <Header focus={true}></Header>
      <main className="pt-20 pb-15">
        <div className="shopPage-container">
          <div className="flex flex-row justify-between px-5 md:px-20 gap-5">
            <div className=" w-[25%] border border-neutral-300 rounded-md">
              {filters?.map((item: any, index: any) => {
                return (
                  <form className="flex flex-col gap-2 p-4" key={index}>
                    <h4 className="font-weight300">{item.nameString}</h4>
                    <div className="flex flex-col gap-1 ms-1">
                      {item.values.length
                        ? item.values.map((val: any, index: any) => {
                            return (
                              <label
                                key={index}
                                className="flex flex-row gap-1 items-center text-neutral-900 text-size14"
                              >
                                <input
                                  type="checkbox"
                                  name="selective"
                                  value={val.valueString}
                                  checked={
                                    appliedFilters[item.nameString]?.includes(
                                      val.valueString
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    handleFilterCheck(e, item.nameString)
                                  }
                                />
                                {val.hex ? (
                                  <span
                                    style={{
                                      backgroundColor: "#" + val.hex.toString(),
                                    }}
                                    className="w-5 h-5 aspect-square rounded-full"
                                  ></span>
                                ) : (
                                  val.valueString
                                )}
                              </label>
                            );
                          })
                        : null}
                    </div>
                  </form>
                );
              })}
            </div>
            <div className=" w-full flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products?.map((item: any, index: any) => {
                  return <ProductCard key={index} product={item}></ProductCard>;
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default ShopPage;
