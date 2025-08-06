import { Link } from "react-router-dom";
import { Logo } from "../../../config";
import "../../assets/css/desktopHeader.css";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import AccountButtons from "./account-buttons";
import CartCounter from "./cart-counter";
import GoUp from "./goUp";
import useDesktopHeaderLog from "../../hooks/logics/useDesktopHeaderLog";
import DeskMenuItem from "./desktop-menuItem";

interface DesktopHeaderProps {
  focus?: boolean; //if its true cuses some changes in style and the header gets focus
}

const DesktopHeader = ({ focus }: DesktopHeaderProps) => {
  const { user, categories, userLogout } = useDesktopHeaderLog();
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
    <header className="fixed z-50">
      {isScrolled ? <GoUp></GoUp> : null}
      <div
        id="header-container"
        className={`desktop-header relative z-50 flex flex-row gap-10 justify-start items-center px-20 transition-all duration-300 ${
          isScrolled || focus
            ? "bg-white/80 backdrop-blur-2xl shadow-b-lean-300"
            : "bg-transparent"
        }`}
      >
        <Link to={"/"}>
          <img src={Logo} className="" alt="logo" width={60} />
        </Link>
        <div className="menu">
          <nav>
            <ul className="flex px-0 flex-row gap-5 font-weight300 text-cu-neutral-900">
              {categories?.length &&
                categories.map((category: any, index: any) => {
                  return (
                    category.motherId === "root" && (
                      <DeskMenuItem
                        key={category._id}
                        item={category}
                        categories={categories}
                      ></DeskMenuItem>
                    )
                  );
                })}
              <div
                className={`glass absolute w-[100vw] h-[100vh] bg-glass-shadow top-full right-0 z-30 transition-all duration-300 delay-150 invisible opacity-0`}
              ></div>
            </ul>
          </nav>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-full px-0">
              <SearchBar className={"w-auto"}></SearchBar>
            </div>
            <span className="block bg-cu-neutral-700 w-1px h-6 rounded-3xl border-0"></span>
            <div className="block">
              <CartCounter user={user}></CartCounter>
            </div>
            <div className="block">
              <AccountButtons
                user={user}
                userLogout={userLogout}
                mode={"desktop"}
              ></AccountButtons>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
