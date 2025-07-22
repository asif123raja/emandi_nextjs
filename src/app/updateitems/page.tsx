// "use client";
// import React, { useState, useEffect } from "react";

// interface Item {
//   id: string;
//   name: string;
//   price: number;
// }

// const SetQuantityPage: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [itemQuantities, setItemQuantities] = useState<Record<string, string>>({});
//   const [email, setEmail] = useState<string>("");

//   // Fetch items when the component mounts
//   useEffect(() => {
//     async function fetchItems() {
//       const response = await fetch("/api/users/iitems");
//       const data = await response.json();
//       if (data.items) {
//         setItems(data.items);
//       } else {
//         console.error("Failed to fetch items");
//       }
//     }
//     fetchItems();
//   }, []);

//   // Explicitly type parameters: itemId as string and quantity as string
//   const handleQuantityChange = (itemId: string, quantity: string): void => {
//     setItemQuantities((prev) => ({
//       ...prev,
//       [itemId]: quantity,
//     }));
//   };

//   // Type the form event parameter
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Map itemQuantities to an array of objects with itemId and quantity as a number
//     const itemQuantitiesArray = Object.entries(itemQuantities).map(
//       ([itemId, quantity]) => ({
//         itemId: itemId,
//         quantity: parseInt(quantity, 10),
//       })
//     );

//     const response = await fetch("/api/users/updateItems", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email, // Send seller's email
//         itemQuantities: itemQuantitiesArray,
//       }),
//     });

//     const result = await response.json();
//     if (result.success) {
//       console.log("Quantities updated successfully");
//       // Optionally, reset the form or state after successful submission
//       setItemQuantities({});
//     } else {
//       console.error("Error updating quantities:", result.error);
//       alert(`Error updating quantities: ${result.error}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Set Quantity for Items</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="ml-2 p-1 border rounded"
//           />
//         </div>

//         {items.map((item) => (
//           <div key={item.id} className="p-4 border rounded mb-2 flex items-center">
//             <label className="flex-grow">
//               {item.name} (Price: {item.price})
//               <input
//                 type="number"
//                 min="0"
//                 value={itemQuantities[item.id] || ""}
//                 onChange={(e) => handleQuantityChange(item.id, e.target.value)}
//                 className="ml-2 p-1 border rounded"
//               />
//             </label>
//           </div>
//         ))}
//         <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//           Update Quantities
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SetQuantityPage;

"use client";
import React, { useState, useEffect } from "react";

interface Item {
  _id: string;
  name: string;
  price: number;
  sellerSKU: string; // Unique SKU for each seller
}

const SetQuantityPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemQuantities, setItemQuantities] = useState<Record<string, { quantity: string; sellerSKU: string }>>({});
  const [email, setEmail] = useState<string>("");
  const [pinCodes, setPinCodes] = useState<string>(""); // Comma-separated pincodes

  // Fetch available items when the component mounts
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/users/iitems");
        const data = await response.json();
        if (data.success && data.items) {
          setItems(data.items);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  // Update item quantity and seller SKU
  const handleQuantityChange = (itemId: string, quantity: string, sellerSKU: string) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: { quantity, sellerSKU },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pinCodes.trim()) {
      alert("Please enter your email and at least one pincode.");
      return;
    }

    // Convert itemQuantities into the expected API format
    const itemQuantitiesArray = Object.entries(itemQuantities).map(([itemId, data]) => ({
      itemId,
      quantity: parseInt(data.quantity, 10),
      sellerSKU: data.sellerSKU,
    }));

    const formattedPinCodes = pinCodes.split(",").map((p) => p.trim()); // Convert comma-separated string to an array

    const response = await fetch("/api/users/updateItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        itemQuantities: itemQuantitiesArray,
        pinCodes: formattedPinCodes,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Quantities updated successfully");
      setItemQuantities({});
      alert("Item quantities updated successfully!");
    } else {
      console.error("Error updating quantities:", result.error);
      alert(`Error updating quantities: ${result.error}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Set Quantity for Items</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Pincodes (comma-separated):</label>
          <input
            type="text"
            value={pinCodes}
            onChange={(e) => setPinCodes(e.target.value)}
            placeholder="Enter pincodes (e.g., 560001, 110045)"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {items.map((item) => (
          <div key={item._id} className="p-4 border rounded mb-2">
            <label className="block font-medium">
              {item.name} (Price: ₹{item.price})
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                value={itemQuantities[item._id]?.quantity || ""}
                onChange={(e) => handleQuantityChange(item._id, e.target.value, item.sellerSKU)}
                className="p-2 border rounded w-1/2"
                placeholder="Enter quantity"
              />
              <input
                type="text"
                value={itemQuantities[item._id]?.sellerSKU || item.sellerSKU}
                onChange={(e) => handleQuantityChange(item._id, itemQuantities[item._id]?.quantity || "0", e.target.value)}
                className="p-2 border rounded w-1/2"
                placeholder="Seller SKU"
              />
            </div>
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Quantities
        </button>
      </form>
    </div>
  );
};

export default SetQuantityPage;
