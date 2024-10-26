import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface ItemProps {
  image_url: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  price: number;               // Add price prop
  discountedPrice: number;      // Add discounted price prop
  vitamins: { [key: string]: string };
  minerals: { [key: string]: string };
}

const Item: React.FC<ItemProps> = ({
  image_url,
  name,
  description,
  calories,
  protein,
  price,
  discountedPrice,
  vitamins,
  minerals,
}) => {
  const [amount, setAmount] = useState(1);
  const { addToCart, addToWishlist } = useCart();

  const addToCartHandler = () => {
    const itemToAdd = {
      name,
      image: image_url,
      description,
      calories,
      protein,
      amount,
      price,
      discountedPrice,
    };
    addToCart(itemToAdd);
    console.log(`Added ${amount} of ${name} to cart`);
  };

  const addToWishlistHandler = () => {
    const itemToAddToWishlist = {
      name,
      image: image_url,
      description,
      calories,
      protein,
      price,
      discountedPrice,
    };
    addToWishlist(itemToAddToWishlist);
    console.log(`Added ${name} to wishlist`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Image src={image_url} alt={name} className="w-full h-48 object-cover" width={400} height={300} />
      <h2 className="text-2xl font-bold mt-4">{name}</h2>
      <p>{description}</p>
      <p>Calories: {calories}</p>
      <p>Protein: {protein}g</p>
      <p>Price: ${price ? price.toFixed(2) : "N/A"}</p> {/* Display price with fallback */}
      <p>Discounted Price: ${discountedPrice ? discountedPrice.toFixed(2) : "N/A"}</p> {/* Display discounted price with fallback */}
      {/* Display discounted price */}

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
