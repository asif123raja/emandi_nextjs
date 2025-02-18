// import React, { useState } from "react";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";

// interface ItemProps {
//   image_url: string;
//   name: string;
//   description: string;
//   calories: number;
//   protein: number;
//   price: number;               // Add price prop
//   discountedPrice: number;      // Add discounted price prop
//   vitamins: { [key: string]: string };
//   minerals: { [key: string]: string };
// }

// const Item: React.FC<ItemProps> = ({
//   image_url,
//   name,
//   description,
//   calories,
//   protein,
//   price,
//   discountedPrice,
//   vitamins,
//   minerals,
// }) => {
//   const [amount, setAmount] = useState(1);
//   const { addToCart, addToWishlist } = useCart();

//   const addToCartHandler = () => {
//     const itemToAdd = {
//       name,
//       image: image_url,
//       description,
//       calories,
//       protein,
//       amount,
//       price,
//       discountedPrice,
//     };
//     addToCart(itemToAdd);
//     console.log(`Added ${amount} of ${name} to cart`);
//   };

//   const addToWishlistHandler = () => {
//     const itemToAddToWishlist = {
//       name,
//       image: image_url,
//       description,
//       calories,
//       protein,
//       price,
//       discountedPrice,
//     };
//     addToWishlist(itemToAddToWishlist);
//     console.log(`Added ${name} to wishlist`);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <Image src={image_url} alt={name} className="w-full h-48 object-cover" width={400} height={300} />
//       <h2 className="text-2xl font-bold mt-4">{name}</h2>
//       <p>{description}</p>
//       <p>Calories: {calories}</p>
//       <p>Protein: {protein}g</p>
//       <p>Price: ₹{price ? price.toFixed(2) : "N/A"}</p> {/* Display price with fallback */}
//       <p>Discounted Price: ₹{discountedPrice ? discountedPrice.toFixed(2) : "N/A"}</p> {/* Display discounted price with fallback */}
//       {/* Display discounted price */}

//       <div>
//         <h4>Vitamins:</h4>
//         {Object.entries(vitamins).map(([key, value]) => (
//           <p key={key}>{key}: {value}</p>
//         ))}
//       </div>
//       <div>
//         <h4>Minerals:</h4>
//         {Object.entries(minerals).map(([key, value]) => (
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
//         <div className=" text-xl">
//         1 unit means 50 kg.
//         </div>
//         <button
//           onClick={addToCartHandler}
//           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={addToWishlistHandler}
//           className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-full"
//         >
//           Add to Wishlist
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Item;

"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface ItemProps {
  id: string; // Added unique identifier
  image: string; // Changed from image_url to match CartItem type
  name: string;
  description: string;
  calories: number;
  protein: number;
  price: number;
  discounted_price: number; // Changed to snake_case for consistency
  currency: string;
  vitamins: Record<string, string>;
  minerals: Record<string, string>;
  stock_quantity: number; // Added stock information
}

const Item: React.FC<ItemProps> = ({
  id,
  image,
  name,
  description,
  calories,
  protein,
  price,
  discounted_price,
  currency,
  vitamins,
  minerals,
  stock_quantity,
}) => {
  const [amount, setAmount] = useState(1);
  const { addToCart, addToWishlist } = useCart();

  const handleAddToCart = () => {
    if (amount > stock_quantity) {
      alert(`Only ${stock_quantity} items available in stock`);
      return;
    }

    const itemToAdd = {
      id,
      name,
      image,
      description,
      calories,
      protein,
      price,
      discounted_price,
      currency,
      amount,
    };

    addToCart(itemToAdd);
    console.log(`Added ${amount} ${name} to cart`);
  };

  const handleAddToWishlist = () => {
    // Ensure all properties required by WishlistItem are included:
    const wishlistItem = {
      id,
      name,
      image,
      description,
      calories,       // Added missing property
      protein,        // Added missing property
      price,
      discounted_price,
      currency,
    };

    addToWishlist(wishlistItem);
    console.log(`Added ${name} to wishlist`);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        
        <div className="mt-4 space-y-2">
          <NutritionInfo label="Calories" value={`${calories}kcal`} />
          <NutritionInfo label="Protein" value={`${protein}g`} />
        </div>

        <div className="mt-4">
          <PriceDisplay 
            price={price}
            discountedPrice={discounted_price}
            currency={currency}
          />
          <StockStatus quantity={stock_quantity} />
        </div>

        <NutritionSection title="Vitamins" items={vitamins} />
        <NutritionSection title="Minerals" items={minerals} />

        <div className="mt-6 space-y-4">
          <QuantitySelector
            value={amount}
            min={1}
            max={stock_quantity}
            onChange={setAmount}
          />
          
          <ActionButton 
            onClick={handleAddToCart}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Add to Cart
          </ActionButton>
          
          <ActionButton 
            onClick={handleAddToWishlist}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Add to Wishlist
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// Sub-components for better organization
const NutritionInfo: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-700">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

const PriceDisplay: React.FC<{ 
  price: number; 
  discountedPrice: number;
  currency: string 
}> = ({ price, discountedPrice, currency }) => (
  <div className="flex items-center gap-4 mt-4">
    {discountedPrice < price ? (
      <>
        <span className="text-2xl font-bold text-green-600">
          {currency} {discountedPrice.toFixed(2)}
        </span>
        <span className="text-gray-500 line-through">
          {currency} {price.toFixed(2)}
        </span>
      </>
    ) : (
      <span className="text-2xl font-bold text-gray-800">
        {currency} {price.toFixed(2)}
      </span>
    )}
  </div>
);

const StockStatus: React.FC<{ quantity: number }> = ({ quantity }) => (
  <div className={`mt-2 text-sm ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
    {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
  </div>
);

const NutritionSection: React.FC<{ 
  title: string; 
  items: Record<string, string> 
}> = ({ title, items }) => (
  Object.entries(items).length > 0 && (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(items).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-600">{key}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
);

const QuantitySelector: React.FC<{
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ value, min, max, onChange }) => (
  <div className="flex items-center gap-4">
    <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
    <input
      type="number"
      id="quantity"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
      className="w-24 px-3 py-2 border rounded-md"
    />
    <span className="text-sm text-gray-500">1 unit = 50kg</span>
  </div>
);

const ActionButton: React.FC<{
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`${className} w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors`}
  >
    {children}
  </button>
);

export default Item;
