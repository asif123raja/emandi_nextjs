import React, { useState } from "react";
import { useCart } from "@/context/CartContext"; // Import the useCart hook
import Image from "next/image";

interface ItemProps {
  image_url: string; // Change this to match the new key
  name: string;
  description: string;
  calories: number;
  protein: number;
  vitamins: { [key: string]: string }; // Change the type if needed
  minerals: { [key: string]: string }; // Change the type if needed
}

const Item: React.FC<ItemProps> = ({
  image_url, // Use image_url here
  name,
  description,
  calories,
  protein,
  vitamins,
  minerals,
}) => {
  const [amount, setAmount] = useState(1);
  const { addToCart, addToWishlist } = useCart(); // Use the context

  const addToCartHandler = () => {
    const itemToAdd = {
      name,
      image: image_url, // Update this to match your cart structure
      description,
      calories,
      protein,
      amount,
    };
    addToCart(itemToAdd); // Add the item to the cart
    console.log(`Added ${amount} of ${name} to cart`);
  };

  const addToWishlistHandler = () => {
    const itemToAddToWishlist = {
      name,
      image: image_url, // Update this to match your wishlist structure
      description,
      calories,
      protein,
    };
    addToWishlist(itemToAddToWishlist); // Add the item to the wishlist
    console.log(`Added ${name} to wishlist`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Image src={image_url} alt={name} className="w-full h-48 object-cover" width={400} height={300} />
      <h2 className="text-2xl font-bold mt-4">{name}</h2>
      <p>{description}</p>
      <p>Calories: {calories}</p>
      <p>Protein: {protein}g</p>
      <div>
        <h4>Vitamins:</h4>
        {Object.entries(vitamins).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
      <div>
        <h4>Minerals:</h4>
        {Object.entries(minerals).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium">Amount:</label>
        <input
          type="number"
          id="amount"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          onClick={addToCartHandler}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlistHandler}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Item;
