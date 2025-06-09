import { Link } from "react-router-dom";
import { DEFAULT_AVATAR, SERVER_URL } from "../../../config";
import "../../assets/css/account-buttons.css";

const AccountButtons = (props: any) => {
  return (
    <>
      {!props.user ? (
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
        <div className="account-hover relative shadow-sm shadow-cu-neutral-900 rounded-full flex justify-center items-center">
          <img
            src={
              props.user?.avatar
                ? SERVER_URL + props.user.avatar
                : DEFAULT_AVATAR
            }
            width={40}
            className="rounded-full aspect-square object-cover"
            alt="user-avatar"
          />
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
            <button onClick={props.userLogout}>خروج از حساب</button>
          </div>
        </div>
      )}
    </>
  );
};
export default AccountButtons;
