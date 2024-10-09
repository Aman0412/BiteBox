import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm (){
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order-confirmation",
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="payment-submit" type="submit" disabled={!stripe}>Pay</button>
      {error && <div>{error}</div>}
    </form>
  );
};