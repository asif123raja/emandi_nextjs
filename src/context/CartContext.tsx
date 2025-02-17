"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  name: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  amount: number; // Amount of this item in the cart
}

interface WishlistItem extends Omit<CartItem, "amount"> {} // Wishlist items do not have an amount

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (item: Omit<CartItem, "amount"> & { amount?: number }) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (name: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = typeof window !== "undefined"; // Check if running in browser

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (!isClient) return [];
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from local storage:", error);
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    if (!isClient) return [];
    try {
      const storedWishlist = localStorage.getItem("wishlistItems");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist items from local storage:", error);
      return [];
    }
  });

  // Save to localStorage when cart or wishlist changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Failed to save cart or wishlist items to local storage:", error);
      }
    }
  }, [cartItems, wishlistItems]);

  const addToCart = (item: Omit<CartItem, "amount"> & { amount?: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, amount: Math.max(cartItem.amount + (item.amount || 1), 1) }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, amount: Math.max(item.amount || 1, 1) }];
      }
    });
  };

  const removeFromCart = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCartItems([]); // Clear all items from the cart
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((wishlistItem) => wishlistItem.name === item.name);
      return existingItem ? prevItems : [...prevItems, item]; // Prevent duplicates
    });
  };

  const removeFromWishlist = (name: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hooks for using cart and wishlist
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useWishlist = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useWishlist must be used within a CartProvider");
  }
  return {
    wishlistItems: context.wishlistItems,
    removeFromWishlist: context.removeFromWishlist,
  };
};
