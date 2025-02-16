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
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CartItem {
  name: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  amount: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void; // New function to clear the cart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Memoize addToCart to avoid unnecessary re-renders
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, amount: cartItem.amount + item.amount }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  }, []);

  // Memoize removeFromCart to avoid unnecessary re-renders
  const removeFromCart = useCallback((name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  }, []);

  // Add a function to clear the cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
