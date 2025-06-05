import { Link } from "react-router-dom";
import useHeaderLog from "../../hooks/logics/useHeaderLog";

const Header = () => {
  const { user, list, userLogout } = useHeaderLog();
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
          <Link to={"/cart"}>سبد خرید</Link>
          <br />
          <button onClick={userLogout}>logout</button>
        </>
      )}
    </div>
  );
};

export default Header;
