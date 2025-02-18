"use client";
import React, { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  price: number;
}

const SetQuantityPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemQuantities, setItemQuantities] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<string>("");

  // Fetch items when the component mounts
  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/users/iitems");
      const data = await response.json();
      if (data.items) {
        setItems(data.items);
      } else {
        console.error("Failed to fetch items");
      }
    }
    fetchItems();
  }, []);

  // Explicitly type parameters: itemId as string and quantity as string
  const handleQuantityChange = (itemId: string, quantity: string): void => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  // Type the form event parameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Map itemQuantities to an array of objects with itemId and quantity as a number
    const itemQuantitiesArray = Object.entries(itemQuantities).map(
      ([itemId, quantity]) => ({
        itemId: itemId,
        quantity: parseInt(quantity, 10),
      })
    );

    const response = await fetch("/api/users/updateItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email, // Send seller's email
        itemQuantities: itemQuantitiesArray,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Quantities updated successfully");
      // Optionally, reset the form or state after successful submission
      setItemQuantities({});
    } else {
      console.error("Error updating quantities:", result.error);
      alert(`Error updating quantities: ${result.error}`);
    }
  };

  return (
    <div>
      <h1>Set Quantity for Items</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="ml-2 p-1 border rounded"
          />
        </div>

        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded mb-2 flex items-center">
            <label className="flex-grow">
              {item.name} (Price: {item.price})
              <input
                type="number"
                min="0"
                value={itemQuantities[item.id] || ""}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            </label>
          </div>
        ))}
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Update Quantities
        </button>
      </form>
    </div>
  );
};

export default SetQuantityPage;
