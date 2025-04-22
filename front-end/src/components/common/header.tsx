import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { SERVER_URL } from "../../../config";
import axios from "axios";
import callManager from "../../helpers/calls/callManager";

const Header = () => {
  const { call, loading } = callManager();
  const navigate = useNavigate();
  const { user } = useUserStore();

  async function userLogout() {
    const response = await call(axios.get(SERVER_URL + "/token/logout"), false); //deletes the token cookie
    window.location.pathname === "/" //reload the home page
      ? window.location.reload()
      : navigate("/");
  }
  return (
    <div className="bg-pink-300">
      <h1>hello {user?.name} this is header</h1>
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
