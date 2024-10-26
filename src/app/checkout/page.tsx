"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();

  // Calculate the total price by summing up item prices multiplied by their quantities.
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.amount, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="mt-4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.name} className="flex justify-between border p-2 rounded">
            <span>{item.name} (x{item.amount})</span>
            <span>₹{((item.price || 0) * item.amount).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-xl font-semibold">Total: ₹{totalAmount.toFixed(2)}</h2>
      </div>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Confirm Payment</button>
    </div>
  );
};

export default CheckoutPage;
