import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { logout } from "../../helpers/logout";
import { useState } from "react";
import { AxiosMessageType } from "../../types/objects/axiosMessageProps";
import AxiosMessage from "./axiosMessage";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [axiosMsgs, setAxiosMsgs] = useState<AxiosMessageType[]>([]);

  async function userLogout() {
    try {
      const response = await logout(); //deletes the token cookie
      window.location.pathname === "/" //reload the home page
        ? window.location.reload()
        : navigate("/");
    } catch (error: any) {
      setAxiosMsgs([...axiosMsgs, error]);
    }
  }
  return (
    <div className="bg-pink-300">
      {axiosMsgs.length ? (
        <AxiosMessage msg={axiosMsgs[axiosMsgs.length - 1]}></AxiosMessage>
      ) : null}
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
