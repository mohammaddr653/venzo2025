import { useParams, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";

const useShopLog = () => {
  const { categoryId } = useParams();
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [motherCats, setMotherCats] = useState<any[]>([]);
  const [childCats, setChildCats] = useState<any[]>([]);
  const [allParams, setAllParams] = useSearchParams();
  const [appliedQueries, setAppliedQueries] = useState<any>({});
  const [totalPagesCount, setTotalPagesCount] = useState<any>();

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/shop/${categoryId}?${allParams}`),
      false
    );
    setProducts([...response?.data.data.products]);
    setFilters([...response?.data.data.filters]);
    setChildCats([...response?.data.data.childCategories.slice(1)]);
    setMotherCats([...response?.data.data.motherCategories.reverse()]);
    setTotalPagesCount(
      Math.ceil(response?.data.data.totalCount / appliedQueries.limit)
    );
  }

  useEffect(() => {
    let queries: any = {};
    for (const [key, value] of allParams.entries()) {
      if (queries[key] && !queries[key].includes(value)) {
        queries[key] = [...queries[key], value];
      }
      if (!queries[key]) {
        queries[key] = [value];
      }
    }
    if (!queries.page) {
      queries.page = [1];
    }
    if (!queries.limit) {
      queries.limit = [2];
    }

    setAppliedQueries({ ...queries });
  }, [allParams]);

  useEffect(() => {
    if (categoryId && Object.keys(appliedQueries).length) {
      load();
    }
  }, [appliedQueries, categoryId]);

  const handleFilterCheck = (e: ChangeEvent<HTMLInputElement>, name: any) => {
    let currentParams = new URLSearchParams(allParams);
    if (e.target.checked) {
      currentParams.append(`attributes[${name}]`, e.target.value);
    } else {
      currentParams.delete(`attributes[${name}]`, e.target.value);
    }
    currentParams.delete("page");
    setAllParams(currentParams);
  };

  const handleCountPerPage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let currentParams = new URLSearchParams(allParams);
    currentParams.delete("page");
    currentParams.set("limit", e.target.value);
    setAllParams(currentParams);
  };

  const handleChangePage = (pageNum: number) => {
    let currentParams = new URLSearchParams(allParams);
    currentParams.set("page", pageNum.toString());
    setAllParams(currentParams);
  };

  const handleNext = () => {
    const currentPage = parseInt(appliedQueries.page);
    if (currentPage === totalPagesCount) {
      return handleChangePage(totalPagesCount);
    }
    return handleChangePage(currentPage + 1);
  };

  const handlePrev = () => {
    const currentPage = parseInt(appliedQueries.page);
    if (currentPage <= 1) {
      return handleChangePage(1);
    }
    return handleChangePage(currentPage - 1);
  };

  return {
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
  };
};

export default useShopLog;
