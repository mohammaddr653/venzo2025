import { Link, useParams, useSearchParams } from "react-router-dom";
import Header from "../components/common/header";
import { useUserStore } from "../store";
import { ChangeEvent, useEffect, useState } from "react";
import callManager from "../hooks/callManager";
import { DEFAULT_PRODUCT, SERVER_API, SERVER_URL } from "../../config";
import axios from "axios";

const ShopPage = () => {
  const { categoryId } = useParams();
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [allParams, setAllParams] = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState<any>();

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/shop/${categoryId}?${allParams}`),
      false
    );
    setProducts([...response?.data.data.products]);
    setFilters([...response?.data.data.filters]);
  }

  useEffect(() => {
    let filtersObj: any = {};
    for (const [key, value] of allParams.entries()) {
      if (filtersObj[key] && !filtersObj[key].includes(value)) {
        filtersObj[key] = [...filtersObj[key], value];
      }
      if (!filtersObj[key]) {
        filtersObj[key] = [value];
      }
    }
    setAppliedFilters({ ...filtersObj });
  }, [allParams]);

  useEffect(() => {
    if (categoryId && appliedFilters) {
      load();
    }
  }, [appliedFilters, categoryId]);

  const handleFilterCheck = (e: ChangeEvent<HTMLInputElement>, name: any) => {
    let currentParams = new URLSearchParams(allParams);
    if (e.target.checked) {
      currentParams.append(name, e.target.value);
    } else {
      currentParams.delete(name, e.target.value);
    }
    setAllParams(currentParams);
  };
  return (
    <div>
      <Header></Header>
      <h1>shop page</h1>
      <div className="bg-amber-700 p-5 flex flex-row gap-3">
        {filters?.map((item: any, index: any) => {
          return (
            <form className="border flex flex-col gap-1" key={index}>
              <h4>{item.nameString}</h4>
              {item.values.length
                ? item.values.map((val: any, index: any) => {
                    return (
                      <label key={index}>
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
                        {val.valueString}
                      </label>
                    );
                  })
                : null}
            </form>
          );
        })}
      </div>
      <div className="bg-amber-700 p-5 flex flex-row gap-3">
        {products?.map((item: any, index) => {
          return (
            <Link
              to={`/single-shop/${item._id}`}
              key={index}
              className="border"
            >
              <img
                src={item.img ? SERVER_URL + item.img : DEFAULT_PRODUCT}
                alt=""
                className="aspect-square object-cover"
                width={100}
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.stock}</p>
            </Link>
          );
        })}
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default ShopPage;
