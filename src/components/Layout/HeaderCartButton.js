import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <button onClick={props.onShowCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={`${styles.badge} ${styles.bump}`}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;
