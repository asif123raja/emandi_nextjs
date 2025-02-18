"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card"; // Adjust the import path if needed

interface Item {
  id: string;
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
  category: string;
}

const VegetablesPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Veg_Fruits.json");
      const data: Item[] = await response.json();
      const vegetableItems = data.filter((item) => item.category === "Vegetable");
      setItems(vegetableItems);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <Card
          key={item.id}
          image_url={item.image_url} // Changed prop to match CardProps
          name={item.name}
          description={item.description}
          itemData={item}
          price={item.price.toLocaleString()}
          discountedPrice={item.discounted_price.toLocaleString()}
          currency={item.currency}
        />
      ))}
    </div>
  );
};

export default VegetablesPage;
