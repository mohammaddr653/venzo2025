import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";
import useLoadCategories from "../useLoadCategories";
import { useEffect, useRef } from "react";
import { buildList } from "../../helpers/buildList";

const useHeaderLog = () => {
  const { call, loading } = callManager();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { categories, loadCategories } = useLoadCategories();
  const list = useRef<HTMLUListElement>(null);

  async function userLogout() {
    const response = await call(
      axios.get(SERVER_API + "/token/logout"),
      false,
      "/"
    ); //deletes the token cookie
  }
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    buildList(list, categories, null, null, true, handleLink);
  }, [categories]);

  function handleLink(pathString: string) {
    navigate(pathString);
  }

  return { user, list, userLogout };
};

export default useHeaderLog;
