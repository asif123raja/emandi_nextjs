// "use client";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Item from "@/components/ui/item"; // Adjust the import path as needed
// import { useCart } from "@/context/CartContext"; // Import the useCart hook

// const ItemPage: React.FC = () => {
//   const [itemData, setItemData] = useState<any | null>(null);
//   const searchParams = useSearchParams();
//   const { addToCart } = useCart();

//   const name = searchParams.get("name");

//   useEffect(() => {
//     // Retrieve itemData from sessionStorage
//     const data = sessionStorage.getItem("itemData");
//     if (data) {
//       setItemData(JSON.parse(data));
//     }
//   }, []);

//   const handleAddToCart = () => {
//     if (itemData) {
//       const itemToAdd = {
//         name: itemData.name,
//         image: itemData.image_url,
//         description: itemData.description,
//         calories: itemData.calories,
//         protein: itemData.protein,
//         price: itemData.price,                // Add price
//         discountedPrice: itemData.discountedPrice, // Add discounted price
//         amount: 1,
//       };
//       addToCart(itemToAdd);
//       console.log(`Added ${itemToAdd.name} to cart`);
//     }
//   };

//   return (
//     <div>
//       {itemData ? (
//         <>
//           <Item
//             image_url={itemData.image_url}
//             name={itemData.name}
//             description={itemData.description}
//             calories={itemData.calories}
//             protein={itemData.protein}
//             vitamins={itemData.vitamins}
//             minerals={itemData.minerals}
//             price={itemData.price} // Display price
//             discountedPrice={itemData.discountedPrice} // Display discounted price

//           />
//           {/* 1 unit means 50 kg. */}
//           {/* <button
//             onClick={handleAddToCart}
//             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
//           >
//             Add to Cart
//           </button> */}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ItemPage;

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Item from "@/components/ui/item"; // Adjust the import path as needed
import { useCart } from "@/context/CartContext"; // Import the useCart hook

interface ItemData {
  name: string;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  vitamins: { [key: string]: string };
  minerals: { [key: string]: string };
  price: number;
  discountedPrice: number;
  currency: string;
}

const ItemPage: React.FC = () => {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // Optional: Retrieve query parameter if needed
  const nameQuery = searchParams.get("name");

  useEffect(() => {
    // Safely access sessionStorage on the client side
    const data = sessionStorage.getItem("itemData");
    if (data) {
      try {
        const parsedData: ItemData = JSON.parse(data);
        setItemData(parsedData);
      } catch (err) {
        setError("Failed to parse item data.");
      }
    } else {
      setError("Item data not found.");
    }
    setLoading(false);
  }, []);

  const handleAddToCart = () => {
    if (itemData) {
      const itemToAdd = {
        name: itemData.name,
        image: itemData.image_url,
        description: itemData.description,
        calories: itemData.calories,
        protein: itemData.protein,
        price: itemData.price,
        discountedPrice: itemData.discountedPrice,
        currency: itemData.currency,
        amount: 1, // Default quantity
      };
      addToCart(itemToAdd);
      console.log(`Added ${itemToAdd.name} to cart`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!itemData) return <p>No item data found.</p>;

  return (
    <div className="p-4">
      <Item
        image_url={itemData.image_url}
        name={itemData.name}
        description={itemData.description}
        calories={itemData.calories}
        protein={itemData.protein}
        vitamins={itemData.vitamins}
        minerals={itemData.minerals}
        price={itemData.price}
        discountedPrice={itemData.discountedPrice}
        currency={itemData.currency}
      />
      <button
        onClick={handleAddToCart}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemPage;
