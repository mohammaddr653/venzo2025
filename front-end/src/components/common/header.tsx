import { Link } from "react-router-dom";
import useHeaderLog from "../../hooks/logics/useHeaderLog";
import { Logo } from "../../../config";
import "../../assets/css/header.css";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import AccountButtons from "./account-buttons";

const Header = () => {
  const { user, list, userLogout } = useHeaderLog();
  const [isScrolled, setIsScrolled] = useState<any>();

  function handleScroll() {
    let lastScrollTop = 0;
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      isScrolled ? null : setIsScrolled(true);
    } else if (st === 0) {
      setIsScrolled(false);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed">
        <div
          id="header-container"
          className={`flex flex-row justify-between items-center px-20 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl shadow-b-lean-300"
              : "bg-transparent"
          }`}
        >
          <div className="flex flex-row gap-15 items-center">
            <Link to={"/"}>
              <img src={Logo} className="" alt="logo" width={60} />
            </Link>
            <nav>
              <ul
                ref={list}
                className="flex flex-row gap-5 font-weight300 text-cu-neutral-900"
              ></ul>
            </nav>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <AccountButtons
              user={user}
              userLogout={userLogout}
            ></AccountButtons>
            <span className="bg-cu-neutral-700 w-1px block h-6 rounded-3xl border-0"></span>
            <SearchBar></SearchBar>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
