// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";

// const CartPage: React.FC = () => {
//   const { cartItems, removeFromCart } = useCart();
//   const router = useRouter();

//   const handleRemoveFromCart = (name: string) => {
//     removeFromCart(name);
//   };

//   const handleProceedToCheckout = () => {
//     router.push("/checkout");
//   };

//   if (cartItems.length === 0) {
//     return <div>Your cart is empty.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Your Cart</h1>
//       <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
//         {cartItems.map((item) => (
//           <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg shadow-lg">
//             <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded-md" />
//             <div className="flex-grow mx-4 text-center">
//               <h2 className="text-lg font-semibold">{item.name}</h2>
//               <p className="text-sm">Amount: {item.amount}</p>
//               <p className="text-sm">Price: ₹{item.price?.toFixed(2) || "0.00"}</p>
//               {item.discountedPrice && (
//   <p className="text-sm text-green-600">Discounted Price: ₹{item.discountedPrice?.toFixed(2)}</p>
// )}

//             </div>
//             <button
//               onClick={() => handleRemoveFromCart(item.name)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleProceedToCheckout} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };

// export default CartPage;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartItem {
  name: string;
  amount: number;
  price?: number; // Price could be optional
  discountedPrice?: number; // Discounted price could also be optional
  image: string; // Assuming image is a string URL
}

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const handleRemoveFromCart = (name: string) => {
    removeFromCart(name);
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return <div className="text-center text-lg font-semibold p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.map((item: CartItem) => (
          <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg shadow-lg">
            <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded-md" />
            <div className="flex-grow mx-4 text-center">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm">Amount: {item.amount}</p>
              <p className="text-sm">
                Price: ₹{typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
              </p>
              {typeof item.discountedPrice === "number" && (
                <p className="text-sm text-green-600">
                  Discounted Price: ₹{item.discountedPrice.toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.name)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleProceedToCheckout}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
