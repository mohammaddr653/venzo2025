import { Link } from "react-router-dom";
import useHeaderLog from "../../hooks/logics/useHeaderLog";
import { Logo } from "../../../config";
import "../../assets/css/header.css";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import AccountButtons from "./account-buttons";
import CartCounter from "./cart-counter";
import GoUp from "./goUp";

interface HeaderProps {
  focus?: boolean; //if its true cuses some changes in style and the header gets focus
}

const Header = (props: HeaderProps) => {
  const { user, list, glassShow, userLogout } = useHeaderLog();
  const [isScrolled, setIsScrolled] = useState<any>();
  const [mobileMenuShow, setMobileMenuShow] = useState<any>(false);

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
      <header className="fixed z-50">
        {isScrolled ? <GoUp></GoUp> : null}
        <div
          id="header-container"
          className={`relative z-50 flex flex-row gap-10 justify-between md:justify-start items-center px-5 md:px-20 transition-all duration-300 ${
            isScrolled || props.focus
              ? "bg-white/80 backdrop-blur-2xl shadow-b-lean-300"
              : "bg-transparent"
          }`}
        >
          <Link to={"/"}>
            <img src={Logo} className="" alt="logo" width={60} />
          </Link>
          <img
            src="/images/icons/icons8-menu-48.png"
            width={30}
            alt="hambergur-icon"
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuShow(true)}
          />
          {mobileMenuShow ? (
            <div
              className="mobileMenu-overlay"
              onClick={() => setMobileMenuShow(false)}
            ></div>
          ) : null}
          <div
            className={`hideMenu md:desktopMenu ${
              mobileMenuShow ? "showMenu" : null
            }`}
          >
            <nav>
              <ul
                ref={list}
                className="flex px-4 md:px-0 flex-col md:flex-row gap-5 font-weight300 text-cu-neutral-900"
              ></ul>
            </nav>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-start md:items-center">
              <div className="w-full px-4 md:px-0">
                <SearchBar className={"w-full md:w-auto"}></SearchBar>
              </div>
              <span className="hidden md:block bg-cu-neutral-700 w-1px h-6 rounded-3xl border-0"></span>
              <div className="hidden md:block">
                <CartCounter user={user}></CartCounter>
              </div>
              <div className="hidden md:block">
                <AccountButtons
                  user={user}
                  userLogout={userLogout}
                  mode={"desktop"}
                ></AccountButtons>
              </div>
              <div className="block md:hidden px-4 w-full">
                <AccountButtons
                  user={user}
                  userLogout={userLogout}
                  mode={"mobile"}
                ></AccountButtons>
              </div>
            </div>
            <div className="flex md:hidden flex-row justify-between items-center px-4">
              <Link to={"/"}>
                <img src={Logo} alt="logo" width={60} />
              </Link>
              <img
                src="/images/icons/icons8-cross-48.png"
                alt="close-icon"
                width={30}
                className="cursor-pointer"
                onClick={() => setMobileMenuShow(false)}
              />
            </div>
          </div>
        </div>
        <div
          className={`glass absolute w-[100vw] h-[100vh] bg-glass-shadow top-full right-0 z-30 transition-all duration-300 delay-150 ${
            glassShow ? "visible opacity-100" : "invisible opacity-0"
          }`}
        ></div>
      </header>
    </>
  );
};

export default Header;
