// "use client";

// import React, { useEffect } from "react";
// import { useCart } from "@/context/CartContext";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// const CheckoutPage: React.FC<{ onTotalAmountChange: (amount: number) => void }> = ({
//   onTotalAmountChange,
// }) => {
//   const { cartItems } = useCart();
//   const router = useRouter();

//   // Calculate the total price by summing up item prices multiplied by their quantities
//   const totalAmount = cartItems?.reduce(
//     (acc, item) => acc + (item.price || 0) * item.amount *50,
//     0
//   ) || 0;

//   // Pass the total amount back to the parent component
//   useEffect(() => {
//     if (onTotalAmountChange) {
//       onTotalAmountChange(totalAmount);
//     }
//   }, [totalAmount, onTotalAmountChange]);

//   // Handle payment confirmation
//   const handleConfirmPayment = () => {
//     router.push("/payment"); // Redirect to payment page after confirmation
//   };

//   return (
//     <div className="mb-10">
//       <h1 className="text-4xl font-extrabold mb-2">Checkout</h1>
//       <h2 className="text-2xl">
//         Your total amount is
//         <span className="font-bold"> ₹{totalAmount.toFixed(2)}</span>
//       </h2>

//       {/* Show the cart items */}
//       <div className="mt-4 space-y-4">
//         {cartItems?.map((item) => (
//           <div key={item.name} className="flex justify-between border p-2 rounded">
//             <span>
//               {item.name} ( 50kg x{item.amount})
//             </span>
//             <span>₹{((item.price || 0) * item.amount *50).toFixed(2)}</span>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 text-right">
//         <h2 className="text-xl font-semibold">Total: ₹{totalAmount.toFixed(2)}</h2>
//       </div>
//       {/* Button to confirm payment */}
//       {totalAmount > 0 && (
//         <button
//           className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//           onClick={handleConfirmPayment}
//         >
//           Confirm Payment
//         </button>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
// src/app/checkout/page.tsx
"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useTotalAmount } from "../TotalAmountContext/page";
import { useRouter } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const { totalAmount, setTotalAmount } = useTotalAmount();
  const router = useRouter();

  // Calculate the total price
  const computedTotalAmount = cartItems.reduce(
    (acc, item) => acc + ((typeof item.price === "number" ? item.price : 0) * item.amount * 50),
    0
  );

  // Update the context's total amount whenever it changes
  useEffect(() => {
    setTotalAmount(computedTotalAmount);
  }, [computedTotalAmount, setTotalAmount]);

  const handleConfirmPayment = () => {
    router.push("/payment");
  };

  return (
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold mb-2">Checkout</h1>
      <h2 className="text-2xl">
        Your total amount is <span className="font-bold"> ₹{totalAmount.toFixed(2)}</span>
      </h2>

      <div className="mt-4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.name} className="flex justify-between border p-2 rounded">
            <span>
              {item.name} (50kg x{item.amount})
            </span>
            <span>
              ₹{((typeof item.price === "number" ? item.price : 0) * item.amount * 50).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-semibold">Total: ₹{totalAmount.toFixed(2)}</h2>
      </div>

      {totalAmount > 0 && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleConfirmPayment}
        >
          Confirm Payment
        </button>
      )}
    </div>
  );
};

export default CheckoutPage;

