import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useUserStore } from "../store";

const useLoadUser = () => {
  const { call, loading } = callManager();
  const { user, userLoading, setUserLoading, setUser } = useUserStore();

  async function getAuthedUser() {
    const response = await call(axios.get(SERVER_API + "/token"), false);
    const me = response?.data?.data?.user;
    me ? setUser(me) : setUser(null);
    setUserLoading(false);
  }
  return { user, userLoading, getAuthedUser };
};

export default useLoadUser;
