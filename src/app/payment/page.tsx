"use client";

import CheckoutPage from "@/components/ui/checkoutpage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext"; // Ensure this hook is properly imported

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Home() {
  const { cartItems } = useCart(); // Use the cart context to get the cart items
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate the total amount whenever the cart items change
  useEffect(() => {
    const calculatedAmount =
      cartItems?.reduce(
        (acc, item) => acc + (item.price || 0) * item.amount*50,
        0
      ) || 0;
    setTotalAmount(calculatedAmount);
  }, [cartItems]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Amount</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ₹{totalAmount.toFixed(2)}</span>
        </h2>
      </div>

      {/* Conditionally render Elements only when totalAmount is available */}
      {totalAmount > 0 ? (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(totalAmount), // Convert to subunits (paise)
            currency: "inr",
          }}
        >
          {/* Pass the totalAmount as a prop to CheckoutPage */}
          <CheckoutPage amount={totalAmount} />
        </Elements>
      ) : (
        <p className="mt-4 text-red-500">Your cart is empty. Please add items to proceed.</p>
      )}
    </main>
  );
}
