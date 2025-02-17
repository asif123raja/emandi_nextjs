"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the CartItem type
export interface CartItem {
  name: string;
  amount: number;
  price: number;
  discountedPrice?: number;
  image: string;
}

// Define the CartContext type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provide the CartContext to the app
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, amount: cartItem.amount + item.amount }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (name: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
