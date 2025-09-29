import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../config";
import "../../assets/css/account-buttons.css";
import Img from "./img";

const AccountButtons = (props: any) => {
  return (
    <>
      {!props.user ? (
        props.mode === "desktop" ? (
          <>
            <Link to={"/auth/login"}>
              <img
                src="/images/icons/icons8-user-default-64 (1).png"
                width={40}
                alt="user-icon"
              />
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2 text-cu-neutral-900">
              <Link to={"/auth/login"}>ورود </Link>|
              <Link to={"/auth/register"}>ثبت نام </Link>
            </div>
          </>
        )
      ) : props.mode === "desktop" ? (
        <>
          <div className="account-hover relative shadow-sm shadow-cu-neutral-900 rounded-full flex justify-center items-center">
            <Img
              pic={props.user?.avatar}
              sizes={"500px"}
              className={"rounded-full aspect-square object-cover"}
              width={40}
              alt="user-avatar"
            ></Img>
            <div className="hidden-div py-3 absolute flex flex-column gap-2 rounded-xl bg-white shadow-sm shadow-cu-neutral-900 top-full left-full">
              {props.user?.isadmin ? (
                <>
                  <Link to={"/admin"}>پنل ادمین</Link> <hr />
                </>
              ) : null}
              <Link to={"/user"}>حساب کاربری</Link>
              <hr />
              <Link to={"/cart"}>سبد خرید</Link>
              <hr />
              <button className="cursor-pointer" onClick={props.userLogout}>
                خروج از حساب
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" rounded-full flex flex-col gap-3 justify-center items-start">
            <Link
              to={"/user"}
              className="flex flex-row w-full gap-2 justify-between items-center"
            >
              <div className="flex flex-row gap-2 items-center">
                <Img
                  pic={props.user?.avatar}
                  sizes={"500px"}
                  className={"rounded-full aspect-square object-cover"}
                  width={40}
                ></Img>
                <h4>{props.user?.name}</h4>
              </div>
              <p className="text-size13 text-cu-neutral-800 font-weight300">
                حساب کاربری
              </p>
            </Link>
            {props.user?.isadmin ? (
              <>
                <Link
                  to={"/admin"}
                  className="flex flex-row w-full gap-2 justify-between items-center"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <Img
                      pic={props.user?.avatar}
                      sizes={"500px"}
                      className={"rounded-full aspect-square object-cover"}
                      width={40}
                    ></Img>
                    <h4>{props.user?.name}</h4>
                  </div>
                  <p className="text-size13 text-cu-neutral-800 font-weight300">
                    پنل ادمین
                  </p>
                </Link>
              </>
            ) : null}
            <button
              onClick={props.userLogout}
              className="cursor-pointer font-weight300 text-red-600 text-size14 flex flex-row gap-2 items-center"
            >
              <img
                src="/images/icons/icons8-exit-50.png"
                alt="exit-icon"
                width={40}
              />
              خروج از حساب
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default AccountButtons;
