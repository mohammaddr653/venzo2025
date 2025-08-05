import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../callManager";
import useLoadCategories from "../useLoadCategories";
import { useEffect, useRef, useState } from "react";
import { buildList } from "../../helpers/buildList";

const useDesktopHeaderLog = () => {
  const { call, loading } = callManager();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { categories, loadCategories } = useLoadCategories();

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

  return { user, categories, userLogout };
};

export default useDesktopHeaderLog;
