// // src/context/CartContext.tsx
// "use client";
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface CartItem {
//   name: string;
//   image: string;
//   description: string;
//   calories: number;
//   protein: number;
//   amount: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (name: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
//       if (existingItem) {
//         return prevItems.map((cartItem) =>
//           cartItem.name === item.name
//             ? { ...cartItem, amount: cartItem.amount + item.amount }
//             : cartItem
//         );
//       } else {
//         return [...prevItems, item];
//       }
//     });
//   };

//   const removeFromCart = (name: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

"use client";
import { useCart } from '@/context/CartContext';

export default function ContextPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const sampleItem = {
    name: "Sample Item",
    image: "/sample.jpg",
    description: "Sample Description",
    calories: 100,
    protein: 20,
    amount: 1,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Context Page</h1>

      {/* Add Item Button */}
      <button
        onClick={() => addToCart(sampleItem)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Sample Item
      </button>

      {/* Clear Cart Button */}
      <button
        onClick={clearCart}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Clear Cart
      </button>

      {/* Cart Items List */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Cart Items:</h2>
        <ul className="mt-2">
          {cartItems.map((item) => (
            <li key={item.name} className="flex justify-between items-center p-2 border-b">
              <span>
                {item.name} (Qty: {item.amount})
              </span>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Display if cart is empty */}
        {cartItems.length === 0 && (
          <p className="text-gray-500 mt-2">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
