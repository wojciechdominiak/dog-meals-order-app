import { useEffect, useState } from "react";

import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvaliableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLodaing, setIsLoading] = useState();

  const loadMeals = async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "https://task-e1453-default-rtdb.firebaseio.com/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    const loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      });

      setMeals(loadedMeals);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message || "Something went wrong!");
    });
  }, []);

  if (isLodaing) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.mealsLoading}>
        <p>{error}</p>
      </section>
    );
  }
  const listMeals = meals.map((meal) => {
    return (
      <>
        <MealItem
          id={meal.id}
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        ></MealItem>
      </>
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{listMeals}</ul>
      </Card>
    </section>
  );
};

export default AvaliableMeals;
