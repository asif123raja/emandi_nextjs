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
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/allitems"); // Fetch data from backend API
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data.items); // Adjust based on your API response structure
      } catch (err: any) {
        setError(err.message); // Set error message if fetching fails
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error if any
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
          image={item.image_url} // Use image_url instead of image
          name={item.name}
          description={truncateDescription(item.description, 6)}
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

// "use client";
// import React, { useEffect, useState } from "react";
// import Card from "@/components/ui/card"; // Adjust the import path as needed

// interface Item {
//   name: string;
//   image_url: string;
//   description: string;
//   calories: number;
//   protein: number;
//   vitamins: { [key: string]: string };
//   minerals: { [key: string]: string };
//   price: number;
//   discounted_price: number;
//   currency: string;
//   quantity: number; // Added quantity field
// }

// const CardGrid: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [error, setError] = useState<string | null>(null); // Error state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/users/allitems"); // API to fetch items and quantities
//         if (!response.ok) {
//           throw new Error("Failed to fetch items");
//         }
//         const data = await response.json();
//         const itemsWithQuantities = data.itemsWithQuantities; // Assuming your backend sends items with quantities
//         setItems(itemsWithQuantities); // Set the items and quantities
//       } catch (err: any) {
//         setError(err.message); // Set error message if fetching fails
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>; // Display error if any
//   }

//   // Function to truncate the description to 5-6 words
//   const truncateDescription = (description: string, wordCount: number) => {
//     const words = description.split(" ");
//     return words.length > wordCount ? words.slice(0, wordCount).join(" ") + "..." : description;
//   };

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       {items.map((item) => (
//         <Card
//           key={item.name}
//           image={item.image_url} // Use image_url instead of image
//           name={item.name}
//           description={truncateDescription(item.description, 6)}
//           itemData={item}
//           price={item.price.toLocaleString()} // Format price
//           discountedPrice={item.discounted_price.toLocaleString()} // Format discounted price
//           currency={item.currency} // Pass currency
//           quantity={item.quantity} // Pass quantity to card component
//         />
//       ))}
//     </div>
//   );
// };

// export default CardGrid;
