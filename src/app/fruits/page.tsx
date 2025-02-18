"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card"; // Adjust the import path as needed

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
  quantity: number;
}

const FruitsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Veg_Fruits.json");
      const data: Item[] = await response.json();
      const fruitItems = data.filter((item) => item.category === "Fruit");
      setItems(fruitItems);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <Card
          key={item.id}
          image_url={item.image_url}
          name={item.name}
          description={item.description}
          itemData={{
            name: item.name,
            image_url: item.image_url,
            description: item.description,
            calories: item.calories,
            protein: item.protein,
            vitamins: item.vitamins,
            minerals: item.minerals,
            price: item.price,
            discounted_price: item.discounted_price,
            currency: item.currency,
            quantity: item.quantity,
          }}
          price={item.price.toLocaleString()}
          discountedPrice={item.discounted_price.toLocaleString()}
          currency={item.currency}
        />
      ))}
    </div>
  );
};

export default FruitsPage;
