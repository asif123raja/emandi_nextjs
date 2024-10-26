"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Item from "@/components/ui/item"; // Adjust the import path as needed
import { useCart } from "@/context/CartContext"; // Import the useCart hook

const ItemPage: React.FC = () => {
  const [itemData, setItemData] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const name = searchParams.get("name");

  useEffect(() => {
    // Retrieve itemData from sessionStorage
    const data = sessionStorage.getItem("itemData");
    if (data) {
      setItemData(JSON.parse(data));
    }
  }, []);

  const handleAddToCart = () => {
    if (itemData) {
      const itemToAdd = {
        name: itemData.name,
        image: itemData.image_url,
        description: itemData.description,
        calories: itemData.calories,
        protein: itemData.protein,
        price: itemData.price,                // Add price
        discountedPrice: itemData.discountedPrice, // Add discounted price
        amount: 1,
      };
      addToCart(itemToAdd);
      console.log(`Added ${itemToAdd.name} to cart`);
    }
  };

  return (
    <div>
      {itemData ? (
        <>
          <Item
            image_url={itemData.image_url}
            name={itemData.name}
            description={itemData.description}
            calories={itemData.calories}
            protein={itemData.protein}
            vitamins={itemData.vitamins}
            minerals={itemData.minerals}
            price={itemData.price} // Display price
            discountedPrice={itemData.discountedPrice} // Display discounted price
          />
          <button
            onClick={handleAddToCart}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemPage;
