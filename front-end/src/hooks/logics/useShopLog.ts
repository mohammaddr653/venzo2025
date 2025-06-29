import { useParams, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../../hooks/callManager";

const useShopLog = () => {
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

  return {
    filters,
    appliedFilters,
    handleFilterCheck,
    products,
  };
};

export default useShopLog;
