import HeaderCartButton from "./HeaderCartButton";

import styles from "./Header.module.css";

import dogMeals from "../../assets/dogmeals.jpg";

const Header = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>DogMeals</h1>
          <HeaderCartButton />
        </header>
      </div>
      <div className={styles["main-image"]}>
        <img src={dogMeals} alt="Dog Meals" />
      </div>
    </>
  );
};

export default Header;
