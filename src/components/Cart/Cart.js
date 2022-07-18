import { useContext, useState } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    try {
      const response = await fetch(
        "https://task-e1453-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        setIsSubmiting(false);
        setDidSubmit(false);
        throw new Error("Something went wrong!");
      }
      setIsSubmiting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button onClick={props.onHideCart} className={styles["button-alt"]}>
            Close
          </button>
          {cartCtx.items.length !== 0 && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data!</p>;

  const isSubmittedModalContent = (
    <>
      <p>Succesully sent order!</p>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!error && !isSubmiting && !didSubmit && cartModalContent}
      {!error && isSubmiting && isSubmittingModalContent}
      {!error && !isSubmiting && didSubmit && isSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
