import { useLocation } from "react-router";
import api from "../api";
import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import { MealPlanContext } from "../App";

export default function Cart() {
  const location = useLocation();
  const order_id = location.state.order_id;
  const [order, setOrder] = useState(null);
  const { mealPlan } = useContext(MealPlanContext);
  console.log(order_id);
  useEffect(() => {
    async function getOrder() {
      const res = await api.get(`/api/orders/${order_id}/`);
      setOrder(res.data);
    }
    getOrder();
  }, []);
  console.log(mealPlan);
  console.log(order);

  return (
    <div>
      <Navbar />
      <div className="cart">
        <h1>Order Overview</h1>
        <div className="cart-details">
          <div className="cart-items">
            {order != null ? (
              order.items.map((item) => (
                <CartItem
                  key={item.meal.id}
                  image={item.meal.image}
                  quantity={item.quantity}
                  calories={item.meal.calories}
                  protein={item.meal.protein}
                  name={item.meal.name}
                />
              ))
            ) : (
              <div>Loading... </div>
            )}
          </div>
          <div className="payment">
            <div className="cart-payment">
              <h2>Payment Info</h2>
              <div className="payment-info">
                <p>Number of Meals</p> <p>{mealPlan.number_of_meals}</p>
              </div>
              <hr />
              <div className="payment-info">
                <p>Meal Size</p>{" "}
                <p>{mealPlan.meal_size === "S" ? "Standard" : "Large"}</p>
              </div>
              <hr />
              <div className="payment-info">
                <p>Delivery Date</p>{" "}
                <p>{order != null && order.delivery_date}</p>
              </div>
              <hr />
              <label htmlFor="discount">Discount Code</label>
              <input type="text" style={{ height: "5vh" }} id="discount" />
              <hr />
              <div className="payment-info">
                <p style={{ fontWeight: 900 }}>Total Price:</p>{" "}
                <p>£{mealPlan.price}</p>
              </div>
            </div>
            <button className="payment-button">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* < */
}
