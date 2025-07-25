import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  image: string;
  name: string;
  description: string;
  itemData: {
    name: string;
    image: string;
    description: string;
    calories: number;
    protein: number;
    vitamins: { [key: string]: string };
    minerals: { [key: string]: string };
    price: number;                 // Added price field
    discounted_price: number;      // Added discounted price field
    currency: string;              // Added currency field
  };
}

const Card: React.FC<CardProps> = ({ image, name, description, itemData }) => {
  const handleClick = () => {
    // Store itemData in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("itemData", JSON.stringify(itemData));
    }
  };

  return (
    <Link
      href={`/item/${name}`}
      onClick={handleClick} // Trigger storage on click
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        width={400}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold flex justify-center items-center">{name}</h3>
        <p>{description}</p>
        <div className="mt-2">
          <span className="text-lg font-semibold flex justify-center items-centers p-2">
          ₹{itemData.discounted_price.toLocaleString()}{" "}
            <span className="text-red-500 line-through pl-2">
            ₹{itemData.price.toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

// src/components/ui/card.tsx
