import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { SERVER_API } from "../../../config";
import axios from "axios";
import callManager from "../../helpers/callManager";
import useLoadCategories from "../../helpers/useLoadCategories";
import { useEffect, useRef } from "react";
import { buildList } from "../../helpers/buildList";

const Header = () => {
  const { call, loading } = callManager();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { categories, loadCategories } = useLoadCategories();
  const list = useRef<HTMLUListElement>(null);

  async function userLogout() {
    const response = await call(axios.get(SERVER_API + "/token/logout"), false); //deletes the token cookie
    window.location.pathname === "/" //reload the home page
      ? window.location.reload()
      : navigate("/");
  }
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    buildList(list, categories, null, null, true, handleLink);
  }, [categories]);

  function handleLink(origin: string, categoryId: string) {
    navigate(`/${origin}/${categoryId}`);
  }

  return (
    <div className="bg-pink-300">
      <h1>hello {user?.name} this is header</h1>
      <nav>
        <ul ref={list}>{/* dynamic */}</ul>
      </nav>
      {!user ? (
        <>
          <Link to={"/auth/register"}>register</Link>
          <br />
          <Link to={"/auth/login"}>login</Link>
        </>
      ) : (
        <>
          {user?.isadmin ? <Link to={"/admin"}>پنل ادمین</Link> : null}
          <br />
          <Link to={"/user"}>حساب کاربری</Link>
          <br />
          <button onClick={userLogout}>logout</button>
        </>
      )}
    </div>
  );
};

export default Header;
