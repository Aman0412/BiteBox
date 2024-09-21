import api from "../api"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { MealPlanContext, UseridContext } from "../App"
import Card from "../components/Card"
import { ACCESS_TOKEN } from "../constants"

export default function Meals(){
  const { userid } = useContext(UseridContext);
  const [filtered_meals, setFilteredMeals] = useState([]);
  const { mealPlan } = useContext(MealPlanContext);
  const navigate = useNavigate();
  console.log(userid);
  useEffect(() => {
    async function getMeals() {
      const res = await api.get("/api/meals/");
      const meals = res.data;
      if (protein_preference === "MO") {
        setFilteredMeals(
          meals
            .filter((meal) => !meal.is_vegan)
            .map((meal) => ({ ...meal, quantity: 0 }))
        );
      } else if (protein_preference === "VO") {
        setFilteredMeals(
          meals
            .filter((meal) => meal.is_vegan)
            .map((meal) => ({ ...meal, quantity: 0 }))
        );
      } else {
        setFilteredMeals(meals.map((meal) => ({ ...meal, quantity: 0 })));
      }
    }
    getMeals();
  }, [mealPlan]);

  console.log(mealPlan);

  const { protein_preference, number_of_meals } = mealPlan;
  number_of_meals;
  const total_count = filtered_meals.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  function handleDecrement(id) {
    console.log(id);
    setFilteredMeals((prevMeals) => {
      return prevMeals.map((meal) =>
        meal.id === id && meal.quantity > 0
          ? { ...meal, quantity: meal.quantity - 1 }
          : meal
      );
    });
  }

  console.log(filtered_meals);

  function handleIncrement(id) {
    if (total_count < mealPlan.number_of_meals) {
      setFilteredMeals((prevMeals) => {
        return prevMeals.map((meal) =>
          meal.id === id ? { ...meal, quantity: meal.quantity + 1 } : meal
        );
      });
    }
  }

  function createOrderItems(orderid) {
    console.log(orderid);
  }

  async function handleSubmit(){
    console.log(localStorage.getItem(ACCESS_TOKEN))
    const res = await api.get("api/customers/me");
    if (Array.isArray(res.data.address_details) && res.data.address_details.length > 0){
        navigate("/existing-details", {state : {orderItems: filtered_meals.filter((meal) => meal.quantity > 0)}})
    } else {
        navigate("/join-now/details", {state : {orderItems: filtered_meals.filter((meal) => meal.quantity > 0)} } );
    }
  }

  const mealsLeft = mealPlan.number_of_meals - total_count;
  return (
    <div>
      <Navbar />
      <div className="meals-body">
        <div className="card-container">
          {filtered_meals.map((meal) => (
            <Card
              key={meal.id}
              calories={meal.calories}
              name={meal.name}
              image={meal.image}
              handleDecrement={() => handleDecrement(meal.id)}
              handleIncrement={() => handleIncrement(meal.id)}
              quantity={meal.quantity}
            />
          ))}
        </div>
        <div className="floating-bar">
          <p className="floating-bar-text">
            {mealsLeft === 0
              ? "Great Choices"
              : "You have " +
                mealsLeft +
                (mealsLeft === 1 ? " meal " : " meals ") +
                "to pick"}
          </p>
          
    
            <button className="floating-bar-button" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
}