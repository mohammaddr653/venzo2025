import { Link } from "react-router-dom";
import "../../assets/css/account-buttons.css";

const CartCounter = (props: any) => {
  return (
    <>
      {props.user ? (
        <div>
          <Link to={"/cart"} className="m-0 p-0">
            <img
              src="/images/icons/icons8-cart-48.png"
              alt="exit-icon"
              width={40}
            />
          </Link>
        </div>
      ) : null}
    </>
  );
};
export default CartCounter;
