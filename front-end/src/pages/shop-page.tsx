import Header from "../components/common/header";
import useShopLog from "../hooks/logics/useShopLog";
import Footer from "../components/common/footer";
import ProductCard from "../components/common/product-card";
import Pagination from "../components/common/pagination";
import ChildCategories from "../components/common/childCategories";
import BreadCrumb from "../components/common/breadCrumb";
import { useState } from "react";
import CrossSvg from "../components/icons/cross-svg";
import FiltersForm from "../components/common/filtersForm";
import MobFiltersForm from "../components/common/mobFiltersForm";

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
            {motherCats?.length && (
              <BreadCrumb motherCats={motherCats}></BreadCrumb>
            )}
            {childCats?.length && (
              <ChildCategories
                childCats={childCats}
                categoryId={categoryId}
              ></ChildCategories>
            )}
          </div>
          <div className="flex flex-row justify-between items-stretch px-5 md:px-20 gap-5">
            {filters?.length ? (
              <div className="hidden lg:flex flex-[1] flex-col gap-2">
                <p className="py-2">فیلتر ها</p>
                <FiltersForm
                  filters={filters}
                  appliedQueries={appliedQueries}
                  handleFilterCheck={handleFilterCheck}
                ></FiltersForm>
              </div>
            ) : null}
            <div className=" flex flex-[4] flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-end items-center rounded-md mt-auto">
                  <button
                    className="flex lg:hidden"
                    onClick={() => setMobFiltersShow(true)}
                  >
                    فیلتر ها
                  </button>
                  <p className="text-size15 py-2">تعداد نمایش</p>
                  <select
                    name="countPerPage"
                    id="countPerPage"
                    onChange={handleCountPerPage}
                    value={appliedQueries.limit}
                  >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products?.map((item: any, index: any) => {
                    return (
                      <ProductCard key={index} product={item}></ProductCard>
                    );
                  })}
                </div>
              </div>
              <div className="bg-red-300 mt-auto">
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
            <div className="bg-white fixed lg:hidden top-0 right-0 w-[100vw] h-[100vh] z-50">
              <button
                className="bg-amber-50"
                onClick={() => setMobFiltersShow(false)}
              >
                <CrossSvg width={30} fill={"#333"}></CrossSvg>
              </button>
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
