import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/Authentication";
import axios from "axios";
import useSingleUser from "../../../../hooks/data/useSingleUser";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = 99;

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post(
          "https://exforum24.vercel.app/create-payment-intent",
          {
            price: totalPrice,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice]);

  const { userInfo = {} } = useSingleUser();

  const { _id } = userInfo;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        axios
          .put(
            `https://exforum24.vercel.app/users/${_id}`,
            {
              isMember: true,
              badges: ["Gold Badge"],
            },
            { withCredentials: true }
          )
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment Successfully Done!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/membership");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-violet-400 p-1 px-3 my-4 rounded text-white active:scale-95 disabled:bg-gray-200"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
