import Header from "../components/common/header";
import useShopLog from "../hooks/logics/useShopLog";
import Footer from "../components/common/footer";
import Pagination from "../components/common/pagination";
import ChildCategories from "../components/common/childCategories";
import BreadCrumb from "../components/common/breadCrumb";
import { useState } from "react";
import CrossSvg from "../components/icons/cross-svg";
import FiltersForm from "../components/common/filtersForm";
import MobFiltersForm from "../components/common/mobFiltersForm";
import ProductResponsiveCard from "../components/common/product-responsive-card";

const ShopPage = () => {
  const {
    filters,
    appliedQueries,
    handleFilterCheck,
    categoryId,
    products,
    childCats,
    motherCats,
    totalPagesCount,
    handleCountPerPage,
    handleChangePage,
    handleNext,
    handlePrev,
  } = useShopLog();

  const [mobFiltersShow, setMobFiltersShow] = useState(false);

  return (
    <>
      <Header focus={true}></Header>
      <main className="pt-20 pb-15">
        <div className="shopPage-container flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            {motherCats?.length > 0 && (
              <BreadCrumb motherCats={motherCats}></BreadCrumb>
            )}
            {childCats?.length > 0 && (
              <ChildCategories
                childCats={childCats}
                categoryId={categoryId}
              ></ChildCategories>
            )}
          </div>
          <div className="flex flex-row justify-between items-stretch px-5 md:px-20 gap-5">
            {filters?.length ? (
              <div className="hidden lg:flex flex-[1] flex-col gap-2">
                <p className="py-3">فیلتر ها</p>
                <FiltersForm
                  filters={filters}
                  appliedQueries={appliedQueries}
                  handleFilterCheck={handleFilterCheck}
                ></FiltersForm>
              </div>
            ) : null}
            <div className=" flex flex-[4] flex-col justify-between gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-start items-center rounded-md mt-auto">
                  <button
                    className="flex lg:hidden bg-white border text-amber-900 border-primary rounded-md px-2 py-1 cursor-pointer"
                    onClick={() => setMobFiltersShow(true)}
                  >
                    فیلتر ها
                  </button>
                  <label className="text-size15 py-2 flex gap-1 items-center ms-auto">
                    <p className="font-weight300">تعداد نمایش :</p>
                    <select
                      name="countPerPage"
                      id="countPerPage"
                      className="appearance-none p-2 w-15 py-1 border border-neutral-300 rounded-md"
                      onChange={handleCountPerPage}
                      value={appliedQueries.limit}
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products?.map((item: any, index: any) => {
                    return (
                      //very similar to ProductCard...for now at least
                      <ProductResponsiveCard
                        key={index}
                        product={item}
                      ></ProductResponsiveCard>
                    );
                  })}
                </div>
              </div>
              <div>
                <Pagination
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handleChangePage={handleChangePage}
                  totalPagesCount={totalPagesCount}
                  appliedQueries={appliedQueries}
                ></Pagination>
              </div>
            </div>
          </div>
          {mobFiltersShow && (
            <div className="bg-white py-2 fixed lg:hidden top-0 flex flex-col left-0 w-[100vw] h-[100vh] z-50">
              <div className="flex justify-end">
                <button
                  className="p-2 text-center w-fit cursor-pointer"
                  onClick={() => setMobFiltersShow(false)}
                >
                  <CrossSvg width={30} fill={"#333"}></CrossSvg>
                </button>
              </div>
              <MobFiltersForm
                filters={filters}
                appliedQueries={appliedQueries}
                handleFilterCheck={handleFilterCheck}
              ></MobFiltersForm>
            </div>
          )}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default ShopPage;
