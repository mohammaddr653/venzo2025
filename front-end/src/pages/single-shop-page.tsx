import Header from "../components/common/header";
import useSingleShopLog from "../hooks/logics/useSingleShopLog";
import Footer from "../components/common/footer";
import SingleShopGallery from "../components/common/singleShop-gallery";
import TitleRight from "../components/common/title-right";
import NonSelectivePropertiesGrid from "../components/common/non-selective-properties-grid";
import SelectiveProperties from "../components/common/selective-properties";
import BreadCrumb from "../components/common/breadCrumb";
import Offpercent from "../components/common/offpercent";
import PriceUnit from "../components/common/priceUnit";

const SingleShopPage = () => {
  const {
    product,
    motherCats,
    priceAndStock,
    formData,
    handleSelectProperty,
    handleAddToCart,
    selectedPropertyvalString,
  } = useSingleShopLog();

  return (
    <>
      <Header focus={true}></Header>
      <main className="pt-20 pb-15">
        <div className="singleShopPage-container flex flex-col gap-5">
          {motherCats?.length ? (
            <BreadCrumb motherCats={motherCats}></BreadCrumb>
          ) : null}
          <div className="flex flex-col md:flex-row gap-10 px-5 md:px-20">
            <div className="flex flex-row gap-4 flex-6">
              <div className="flex flex-col gap-2">
                <i className="bi bi-heart text-size24"></i>
              </div>
              <SingleShopGallery product={product}></SingleShopGallery>
            </div>
            <div className=" flex-11 w-full flex flex-col gap-10">
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
                  <div>
                    {priceAndStock.discount ? (
                      <>
                        <div className="flex flex-row gap-1">
                          <span className="text-nowrap line-through text-neutral-600 text-size14">
                            {priceAndStock.price}
                          </span>
                          <Offpercent
                            percent={priceAndStock.percent}
                          ></Offpercent>
                        </div>
                        <div className="flex flex-row gap-1 items-center flex-nowrap">
                          <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                            {priceAndStock.discount.offer}
                          </span>
                          <PriceUnit></PriceUnit>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-row gap-1 items-center flex-nowrap">
                        <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                          {priceAndStock.price}
                        </span>
                        <PriceUnit></PriceUnit>
                      </div>
                    )}
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
          {product?.description === "" ? null : (
            <div className=" px-5 md:px-20 mt-10 flex flex-col gap-4">
              <h4 className="font-weight300 text-neutral-800">بررسی محصول</h4>
              <div
                className="text-justify border border-neutral-300 p-5 rounded-md text-neutral-700"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
          )}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default SingleShopPage;
