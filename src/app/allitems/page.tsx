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
  price: number;                
  discounted_price: number;     
  currency: string;             
  stock_quantity: number;       // Added stock information
}

const CardGrid: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/allitems");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data.items); // Adjust based on your API response structure
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to truncate the description to 5-6 words
  const truncateDescription = (description: string, wordCount: number) => {
    const words = description.split(" ");
    return words.length > wordCount ? words.slice(0, wordCount).join(" ") + "..." : description;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <Card
          key={item.name}
          image={item.image_url}
          name={item.name}
          description={truncateDescription(item.description, 6)}
          itemData={{
            name: item.name,
            image: item.image_url,
            description: item.description,
            calories: item.calories,
            protein: item.protein,
            vitamins: item.vitamins,
            minerals: item.minerals,
            price: item.price,
            discounted_price: item.discounted_price,
            currency: item.currency,
            quantity: item.stock_quantity, // Map stock_quantity to quantity
          }}
        />
      ))}
    </div>
  );
};

export default CardGrid;
