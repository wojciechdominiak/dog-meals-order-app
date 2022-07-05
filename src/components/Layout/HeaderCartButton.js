import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button onClick={props.onShowCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={`${styles.badge} ${styles.bump}`}>3</span>
    </button>
  );
};

export default HeaderCartButton;
