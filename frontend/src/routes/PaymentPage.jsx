import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checkout from "../components/Checkout";
import api from "../api";
// import Navbar from "../components/Navbar";

export default function PaymentPage({price}){
  const [clientSecret, setClientSecret] = useState("");
  const [order, setOrder] = useState(null)

PaymentPage.propTypes = {
  order_id: PropTypes.string.isRequired,
};

  useEffect(() => {
    // Fetch the client secret from the backend
    // async function getOrder(){
    //   const res = await api.get(`/api/orders/${order_id}`)
    //   setOrder(res.data);
    // }
    // getOrder();
    api.post("/api/payments/create_payment_intent/", { amount: price}) // Example amount
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, []);

  return (
    <div className="stripe-checkout-container">{clientSecret && <Checkout clientSecret={clientSecret} />}</div>
  );
};
