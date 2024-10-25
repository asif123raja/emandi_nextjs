// "use client"; // Mark this component as a Client Component

// import React, { useState } from "react";
// import Image from "next/image";

// interface Vitamins {
//   vitamin_C: string;
//   vitamin_A?: string; // optional
//   vitamin_B6?: string;
// }

// interface Minerals {
//   calcium: string;
//   iron: string;
// }

// interface ItemProps {
//   image: string;
//   name: string;
//   description: string;
//   calories: number;
//   protein: number;
//   vitamins: Vitamins; // Properly type the vitamins prop
//   minerals: Minerals; // Properly type the minerals prop
// }

// const Item: React.FC<ItemProps> = ({
//   image,
//   name,
//   description,
//   calories,
//   protein,
//   vitamins = {}, // Provide a default empty object
//   minerals = {}, // Provide a default empty object
// }) => {
//   const [amount, setAmount] = useState<number>(1); // Explicitly type the state

//   const addToCart = () => {
//     console.log(`Added ${amount} of ${name} to cart`);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <Image
//         src={image}
//         alt={name}
//         className="w-full h-48 object-cover"
//         width={400}
//         height={200}
//       />
//       <h2 className="text-2xl font-bold mt-4">{name}</h2>
//       <p>{description}</p>
//       <p>Calories: {calories}</p>
//       <p>Protein: {protein}g</p>
//       <div>
//         <h4>Vitamins:</h4>
//         {Object.entries(vitamins).length > 0 ? ( // Check if vitamins have entries
//           Object.entries(vitamins).map(([key, value]) => (
//             <p key={key}>
//               {key}: {value}
//             </p>
//           ))
//         ) : (
//           <p>No vitamins information available.</p> // Handle case where there are no vitamins
//         )}
//       </div>
//       <div>
//         <h4>Minerals:</h4>
//         {Object.entries(minerals).length > 0 ? ( // Check if minerals have entries
//           Object.entries(minerals).map(([key, value]) => (
//             <p key={key}>
//               {key}: {value}
//             </p>
//           ))
//         ) : (
//           <p>No minerals information available.</p> // Handle case where there are no minerals
//         )}
//       </div>

//       <div className="mt-4">
//         <label htmlFor="amount" className="block text-sm font-medium">
//           Amount:
//         </label>
//         <input
//           type="number"
//           id="amount"
//           min="1"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           className="border border-gray-300 rounded-md p-2 w-full"
//         />
//         <button
//           onClick={addToCart}
//           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Item;


// src/app/item/[name]/page.tsx
// "use client"; // Mark this component as a Client Component

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { useCart } from "@/context/CartContext"; // Import the useCart hook

// const Item: React.FC = () => {
//   const router = useRouter();
//   const { query } = router;

//   // Extracting item data from the query
//   const {
//     image,
//     name,
//     description,
//     calories,
//     protein,
//     vitamins,
//     minerals,
//   } = query;

//   const parsedVitamins = vitamins ? JSON.parse(vitamins as string) : {};
//   const parsedMinerals = minerals ? JSON.parse(minerals as string) : {};

//   const [amount, setAmount] = useState<number>(1); // Explicitly type the state
//   const { addToCart } = useCart(); // Use the context

//   const addToCartHandler = () => {
//     const itemToAdd = {
//       name,
//       image,
//       description,
//       calories: Number(calories),
//       protein: Number(protein),
//       amount,
//     };
//     addToCart(itemToAdd); // Add the item to the cart
//     console.log(`Added ${amount} of ${name} to cart`);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <Image
//         src={image}
//         alt={name}
//         className="w-full h-48 object-cover"
//         width={400}
//         height={200}
//       />
//       <h2 className="text-2xl font-bold mt-4">{name}</h2>
//       <p>{description}</p>
//       <p>Calories: {calories}</p>
//       <p>Protein: {protein}g</p>
//       <div>
//         <h4>Vitamins:</h4>
//         {Object.entries(parsedVitamins).map(([key, value]) => (
//           <p key={key}>{key}: {value}</p>
//         ))}
//       </div>
//       <div>
//         <h4>Minerals:</h4>
//         {Object.entries(parsedMinerals).map(([key, value]) => (
//           <p key={key}>{key}: {value}</p>
//         ))}
//       </div>

//       <div className="mt-4">
//         <label htmlFor="amount" className="block text-sm font-medium">Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           min="1"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           className="border border-gray-300 rounded-md p-2 w-full"
//         />
//         <button
//           onClick={addToCartHandler}
//           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Item;


// src/app/item/[name]/page.tsx
// src/app/item/[name]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Item from "@/components/ui/item"; // Adjust the import path as needed
import { useCart } from "@/context/CartContext"; // Import the useCart hook

const ItemPage: React.FC = () => {
  const [itemData, setItemData] = useState(null);
  const searchParams = useSearchParams(); // Use searchParams instead of router
  const { addToCart } = useCart(); // Use the CartContext

  // Extract the "name" parameter from searchParams
  const name = searchParams.get("name");

  useEffect(() => {
    // Retrieve itemData from sessionStorage
    const data = sessionStorage.getItem("itemData");
    if (data) {
      setItemData(JSON.parse(data));
    }
  }, []);

  const handleAddToCart = () => {
    if (itemData) {
      const itemToAdd = {
        name: itemData.name,
        image: itemData.image_url, // Use image_url
        description: itemData.description,
        calories: itemData.calories,
        protein: itemData.protein,
        amount: 1, // Default amount can be set to 1 or based on user input
      };
      addToCart(itemToAdd); // Add item to cart
      console.log(`Added ${itemToAdd.name} to cart`);
    }
  };

  return (
    <div>
      {itemData ? (
        <>
          <Item
            image_url={itemData.image_url} // Update this to use image_url
            name={itemData.name}
            description={itemData.description}
            calories={itemData.calories}
            protein={itemData.protein}
            vitamins={itemData.vitamins}
            minerals={itemData.minerals}
          />
          <button
            onClick={handleAddToCart}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemPage;
