
"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card"; // Adjust the import path as needed

interface Item {
  name: string;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  vitamins: { [key: string]: string };
  minerals: { [key: string]: string };
  price: number;                // Added price field
  discounted_price: number;     // Added discounted price field
  currency: string;             // Added currency field
}

const CardGrid: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Veg_Fruits.json"); // Adjust the path as needed
      const data: Item[] = await response.json();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <Card
          key={item.name}
          image={item.image_url} // Use image_url instead of image
          name={item.name}
          description={item.description}
          itemData={item}
          price={item.price.toLocaleString()} // Format price
          discountedPrice={item.discounted_price.toLocaleString()} // Format discounted price
          currency={item.currency} // Pass currency
        />
      ))}
    </div>
  );
};

export default CardGrid;
