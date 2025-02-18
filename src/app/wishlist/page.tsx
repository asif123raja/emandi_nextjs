"use client";
import React from "react";
import { useWishlist, useCart, WishlistItem } from "@/context/CartContext";
import Image from "next/image";

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: WishlistItem): void => {
    addToCart(item);
  };

  if (wishlistItems.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-4 border rounded-lg shadow-lg"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              {/* Optionally, display additional item details here */}
            </div>
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover rounded-md ml-4"
            />
            <div className="flex flex-col justify-between ml-4">
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mb-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.name)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
