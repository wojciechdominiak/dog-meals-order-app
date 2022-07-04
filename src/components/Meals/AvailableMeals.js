import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Purina 500g",
    description: "Real lamb",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Purina 1000g",
    description: "Tender & Crunchy",
    price: 36.5,
  },
  {
    id: "m3",
    name: "Purina 200g",
    description: "Real beef",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Purina 100g",
    description: "Real lamb",
    price: 42.99,
  },
];

const AvaliableMeals = () => {
  const listMeals = DUMMY_MEALS.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      ></MealItem>
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
