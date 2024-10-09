import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function Checkout({ clientSecret }) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#303238',
        colorDanger: '#df1b41',
        fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      },
      rules: {
        '.Input': {
          width: '100%', /* Ensure the input elements take up 100% width */
        },
        '.PaymentElement': {
          width: '100%', /* Ensure the PaymentElement takes up 100% width */
        },
      },
    },
  };

  return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
  );
}

Checkout.propTypes = {
  clientSecret: PropTypes.string.isRequired,
};