// // src/components/ui/Card.tsx
// import React from "react";
// import Link from "next/link"; // Ensure you import Link from 'next/link'
// import Image from "next/image";

// interface CardProps {
//   image: string;
//   name: string;
//   description: string;
// }

// const Card: React.FC<CardProps> = ({ image, name, description }) => {
//   return (
//     <Link href={`/item/${name.toLowerCase()}`} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//       <Image 
//         src={image} 
//         alt={name} 
//         className="w-full h-48 object-cover" 
//         width={400} 
//         height={200} 
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{name}</h3>
//         <p>{description}</p>
//       </div>
//     </Link>
//   );
// };

// export default Card;

// src/components/ui/Card.tsx
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// interface CardProps {
//   image: string;
//   name: string;
//   description: string;
// }

// const Card: React.FC<CardProps> = ({ image, name, description }) => {
//   return (
//     <Link
//       href={`/item/${encodeURIComponent(name.toLowerCase())}`} // Navigate to dynamic route
//       className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
//     >
//       <Image src={image} alt={name} className="w-full h-48 object-cover" width={400} height={200} />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{name}</h3>
//         <p>{description}</p>
//       </div>
//     </Link>
//   );
// };

// export default Card;

// src/components/ui/Card.tsx

// import React from "react";
// import Link from "next/link"; 
// import Image from "next/image";

// interface CardProps {
//   image: string;
//   name: string;
//   description: string;
//   itemData: {
//     name: string;
//     image: string;
//     description: string;
//     calories: number;
//     protein: number;
//     vitamins: { [key: string]: string }; // Define the vitamins structure
//     minerals: { [key: string]: string }; // Define the minerals structure
//   }; 
// }

// const Card: React.FC<CardProps> = ({ image, name, description, itemData }) => {
//   return (
//     <Link 
//       href={{
//         pathname: `/item/[name]`,
//         query: { itemData: JSON.stringify(itemData) }, // Pass the item data as query parameter
//       }} 
//       className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
//     >
//       <Image 
//         src={image} 
//         alt={name} 
//         className="w-full h-48 object-cover" 
//         width={400} 
//         height={200} 
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{name}</h3>
//         <p>{description}</p>
//       </div>
//     </Link>
//   );
// };

// export default Card;


import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  image: string;
  name: string;
  description: string;
  itemData: {
    name: string;
    image: string;
    description: string;
    calories: number;
    protein: number;
    vitamins: { [key: string]: string };
    minerals: { [key: string]: string };
  };
}

const Card: React.FC<CardProps> = ({ image, name, description, itemData }) => {
  const handleClick = () => {
    // Store itemData in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("itemData", JSON.stringify(itemData));
    }
  };

  return (
    <Link
      href={`/item/${name}`}
      onClick={handleClick} // Trigger storage on click
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        width={400}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
