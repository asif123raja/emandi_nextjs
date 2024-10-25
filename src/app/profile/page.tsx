// "use client";
// import axios from "axios";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useState } from "react";


// const ProfilePage = () => {
//     const router = useRouter();
//     const [data, setData] = useState<string | null>("nothing");

//     const logout = async () => {
//         try {
//             await axios.get('/api/users/logout');
//             toast.success("Logout successful");
//             router.push('/login');
//         } catch (error: any) {
//             console.error("Logout error:", error.message);
//             toast.error("Failed to logout");
//         }
//     };

//     const getUserDetails = async () => {
//         try {
//             const res = await axios.get('/api/users/me');
//             console.log(res.data); // {message: 'user found', data: {_id: '763hgyg6v6yvvg3t5'}}
//             if (res.data.data) {
//                 setData(res.data.data._id);
//             } else {
//                 console.log("User details not found")
//                 toast.error("User details not found");
//             }
//         } catch (error: any) {
//             console.error("Error fetching user details:", error.message);
//             toast.error("Failed to fetch user details");
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen">

//             {/* Main Content */}
//             <div className="flex flex-col items-center justify-center flex-grow py-2">
//                 <h1 className="text-xl font-bold">Profile</h1>
//                 <hr className="my-4" />
//                 <p>Profile page</p>
//                 <h2 className="p-3 rounded bg-green-500">
//                     {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
//                 </h2>
//                 <hr className="my-4" />
//                 <button
//                     className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
//                     onClick={getUserDetails}
//                 >
//                     Get User Details
//                 </button>
//                 <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
//                     onClick={logout}
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

// src/components/CardGrid.tsx

// import React from "react";
// import Card from "@/components/ui/card";

// const cardData = [
//   {
//     image: "/images/vegetable1.jpg", // Replace with your image paths
//     name: "Tomato",
//     description: "Rich in vitamins and antioxidants.",
//   },
//   {
//     image: "/images/vegetable2.jpg",
//     name: "Cucumber",
//     description: "Hydrating and low in calories.",
//   },
//   {
//     image: "/images/vegetable3.jpg",
//     name: "Carrot",
//     description: "Great for your eyesight.",
//   },
//   {
//     image: "/images/vegetable4.jpg",
//     name: "Spinach",
//     description: "Packed with iron and nutrients.",
//   },
//   {
//     image: "/images/vegetable5.jpg",
//     name: "Broccoli",
//     description: "High in fiber and vitamin C.",
//   },
//   {
//     image: "/images/vegetable6.jpg",
//     name: "Bell Pepper",
//     description: "Rich in vitamins A and C.",
//   },
//   // Add more card data as needed
// ];

// const CardGrid: React.FC = () => {
//   return (
//     <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-6">
//       {cardData.map((item, index) => (
//         <Card key={index} image={item.image} name={item.name} description={item.description} />
//       ))}
//     </div>
//   );
// };

// export default CardGrid;

// src/components/ui/CardGrid.tsx
// "use client"; // Needed if using hooks in Next.js app

// import React, { useEffect, useState } from "react";
// import Card from "@/components/ui/card";

// interface Vitamins {
//   vitamin_C: string;
//   vitamin_A?: string; // optional
//   vitamin_B6?: string;
// }

// interface Minerals {
//   calcium: string;
//   iron: string;
// }

// interface FoodItem {
//   name: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   vitamins: Vitamins;
//   minerals: Minerals;
//   description: string;
// }

// const CardGrid: React.FC = () => {
//   const [cardData, setCardData] = useState<FoodItem[]>([]); // State to hold fetched data

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Fetching data from JSON...");
//         const response = await fetch("/Veg_Fruits.json"); // Correct path for JSON in public folder
//         if (!response.ok) {
//           console.error("Network response was not ok:", response.statusText);
//           throw new Error("Network response was not ok");
//         }
//         const data: FoodItem[] = await response.json(); // Ensure data type is FoodItem[]
//         setCardData(data); // Update state with the fetched data
//       } catch (error) {
//         console.error("Fetch error:", error); // Log any errors
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this runs once after initial render

//   // Log cardData to ensure it's being set correctly
//   console.log("Card Data State:", cardData);

//   return (
//     <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-6">
//       {cardData.length > 0 ? (
//         cardData.map((item, index) => (
//           <Card
//             key={index}
//             image={item.image_url}
//             name={item.name}
//             description={item.description}
//           />
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CardGrid;

// src/components/CardGrid.tsx
// src/components/CardGrid.tsx
"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card"; // Adjust the import path as needed

interface Item {
  name: string;
  image_url: string; // Change this to match your JSON structure
  description: string;
  calories: number;
  protein: number;
  vitamins: { [key: string]: string };
  minerals: { [key: string]: string };
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
        />
      ))}
    </div>
  );
};

export default CardGrid;
