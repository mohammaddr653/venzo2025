import { Link } from "react-router-dom";
import useHeaderLog from "../../hooks/logics/useHeaderLog";

const Header = () => {
  const { user, list, userLogout } = useHeaderLog();
  return (
    <header>
      <div id="header-container" className="border-8 border-red-600 flex flex-row justify-between items-center">
        <div>
          <nav>
            <ul ref={list} className="flex flex-row gap-2"></ul>
          </nav>
        </div>
        <div>
          {!user ? (
            <>
              <Link to={"/auth/register"}>register</Link>
              <br />
              <Link to={"/auth/login"}>login</Link>
            </>
          ) : (
            <div className="flex flex-row gap-2">
              {user?.isadmin ? <Link to={"/admin"}>پنل ادمین</Link> : null}
              <Link to={"/user"}>حساب کاربری</Link>
              <Link to={"/cart"}>سبد خرید</Link>
              <button onClick={userLogout}>خروج از حساب</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
