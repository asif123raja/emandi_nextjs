"use client";
import React from "react";
import { useCart } from "@/context/CartContext"; // Adjust the import path as needed
import Image from "next/image";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleRemoveFromCart = (name: string) => {
    removeFromCart(name);
  };

  console.log('Cart Items:', cartItems); // Log cart items for debugging

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>; // Message if the cart is empty
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
        {cartItems.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg shadow-lg">
            <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded-md" />
            <div className="flex-grow mx-4 text-center">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm">Amount: {item.amount}</p>
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
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
