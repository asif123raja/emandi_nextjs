"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  name: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  amount: number; // Amount of this item in the cart
}

interface WishlistItem extends Omit<CartItem, 'amount'> {} // Wishlist items are similar to cart items but without amount

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[]; // Added wishlist items
  addToCart: (item: Omit<CartItem, 'amount'> & { amount?: number }) => void; // Allow optional amount
  removeFromCart: (name: string) => void;
  clearCart: () => void; // Method to clear the cart
  addToWishlist: (item: WishlistItem) => void; // Method to add to wishlist
  removeFromWishlist: (name: string) => void; // Method to remove from wishlist
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from local storage:", error);
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlistItems");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist items from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save cart or wishlist items to local storage:", error);
    }
  }, [cartItems, wishlistItems]);

  const addToCart = (item: Omit<CartItem, 'amount'> & { amount?: number }) => {
    const itemWithDefaultAmount = { ...item, amount: item.amount || 1 };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === itemWithDefaultAmount.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === itemWithDefaultAmount.name
            ? { ...cartItem, amount: cartItem.amount + itemWithDefaultAmount.amount }
            : cartItem
        );
      } else {
        return [...prevItems, itemWithDefaultAmount];
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
      if (!existingItem) {
        return [...prevItems, item];
      }
      return prevItems; // Do not add duplicates
    });
  };

  const removeFromWishlist = (name: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, addToCart, removeFromCart, clearCart, addToWishlist, removeFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
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


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
