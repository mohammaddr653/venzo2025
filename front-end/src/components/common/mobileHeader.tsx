import { Link } from "react-router-dom";
import { Logo } from "../../../config";
import "../../assets/css/mobileHeader.css";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./search-bar";
import AccountButtons from "./account-buttons";
import GoUp from "./goUp";
import useMobileHeaderLog from "../../hooks/logics/useMobileHeaderLog";
import MobMenuItem from "./mobile-menuItem";
import { mobileMenuScripts } from "../../helpers/mobileMenuScripts";
import { useMobileMenuStore } from "../../store";

interface MobileHeaderProps {
  focus?: boolean; //if its true cuses some changes in style and the header gets focus
}

const MobileHeader = ({ focus }: MobileHeaderProps) => {
  const { user, categories, userLogout } = useMobileHeaderLog();
  const [isScrolled, setIsScrolled] = useState<any>();
  const { mobileMenuShow, setMobileMenuShow } = useMobileMenuStore();
  const listenerRef = useRef(false);

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

  useEffect(() => {
    if (!listenerRef.current) {
      listenerRef.current = true;
      mobileMenuScripts();
      return () => {
        listenerRef.current = false;
      };
    }
  }, [categories]);

  return (
    <>
      <header className="fixed z-50">
        <div
          id="header-container"
          className={`mobile-header relative z-50 flex flex-row gap-10 justify-between items-center px-5 transition-all duration-300 ${
            isScrolled || focus
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
            className="cursor-pointer"
            onClick={() => setMobileMenuShow(true)}
          />
          {mobileMenuShow ? (
            <div
              className="mobileMenu-overlay"
              onClick={() => setMobileMenuShow(false)}
            ></div>
          ) : null}
          <div
            className={`hideMenu ${
              mobileMenuShow ? "showMenu" : null
            } border-r border-neutral-300`}
          >
            <div className="flex flex-row justify-between items-center px-4">
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
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full px-4">
                <SearchBar className={"w-full"}></SearchBar>
              </div>
              <div className="block px-4 w-full">
                <AccountButtons
                  user={user}
                  userLogout={userLogout}
                  mode={"mobile"}
                ></AccountButtons>
              </div>
            </div>
            <nav className="">
              <ul className="flex px-2 w-full flex-col gap-2 items-center font-weight300 text-cu-neutral-900">
                {categories?.length &&
                  categories.map((category: any, index: any) => {
                    return (
                      category.motherId === "root" && (
                        <MobMenuItem
                          key={category._id}
                          item={category}
                          categories={categories}
                        ></MobMenuItem>
                      )
                    );
                  })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {isScrolled ? <GoUp></GoUp> : null}
    </>
  );
};

export default MobileHeader;
