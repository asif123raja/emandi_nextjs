"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext"; // Import your CartContext to access cart items

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to track authentication
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const { cartItems } = useCart(); // Access cart items from context

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  // Function to check authentication status
  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/users/me'); // Update this with your API endpoint
      setIsAuthenticated(!!res.data.data); // Set authentication status
    } catch {
      setIsAuthenticated(false); // Set to false if an error occurs
    }
  };

  // Call checkAuth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); // Update this with your logout endpoint
      toast.success("Logout successful");
      setIsAuthenticated(false); // Update state
      router.push('/login'); // Redirect to login page
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-teal-500 p-4 relative m-2 rounded-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/images/logo1.jpg" // Using the public path
            alt="Logo"
            className="rounded-3xl h-12 w-12 mr-2"
            width={40}   // Adjust width based on your requirements
            height={40}  // Adjust height based on your requirements
          />
          {/* Only show KrishiMart text on desktop */}
          <span className="hidden md:block text-white text-4xl font-bold">
            <span className="text-purple-300">Krishi</span>
            <span className="text-white">Mart</span>
          </span>
        </div>

        {/* Hamburger menu (for mobile view) */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Cart Icon with Badge in Mobile View */}
          <Link href="/cart" className="relative text-white ml-4">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Header links (Desktop view only) */}
        <div className="hidden md:flex space-x-4">
          <Link href="/wishlist" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            Wishlist
          </Link>
          <Link href="/veggies" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            Veggies
          </Link>
          <Link href="/fruits" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            Fruits
          </Link>
          <Link href="/allitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            All Items
          </Link>
          <Link href="/seller" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            Seller
          </Link>
          <Link href="/helpsection" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            Help Section
          </Link>

          {/* Conditionally render Logout button if user is authenticated or if on Profile page */}
          {(isAuthenticated || pathname === '/profile') ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
              Sign In
            </Link>
          )}
          <Link href="/cart" className="relative text-white ml-4 mt-1">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Dropdown menu (Mobile view, right side only) */}
      {isOpen && (
        <>
          {/* Semi-transparent overlay covering the rest of the screen */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>

          {/* Right side menu */}
          <div className="fixed top-0 right-0 h-full w-3/4 bg-teal-800 z-50 p-6 shadow-lg">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
              <FaTimes size={30} />
            </button>

            <Link href="/wishlist" className="block text-white text-lg py-4 hover:text-teal-300">
              WishList
            </Link>
            <Link href="/veggies" className="block text-white text-lg py-4 hover:text-teal-300">
              Veggies
            </Link>
            <Link href="/fruits" className="block text-white text-lg py-4 hover:text-teal-300">
              Fruits
            </Link>
            <Link href="/allitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
            All Items
            </Link>
            <Link href="/helpsection" className="block text-white text-lg py-4 border border-white px-4 rounded hover:bg-white hover:text-teal-600">
              Help Section
            </Link>

            {/* Conditionally render Logout button if user is authenticated or if on Profile page */}
            {(isAuthenticated || pathname === '/profile') ? (
              <button
                onClick={logout}
                className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block text-white text-lg py-4 hover:text-teal-300">
                Sign In
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
// "use client";
// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes, FaShoppingCart, FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter, usePathname } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// interface Item {
//   name: string;
//   category: string;
//   image_url: string; // Add other fields as needed
// }

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [searchOpen, setSearchOpen] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<Item[]>([]);
  
//   const router = useRouter();
//   const pathname = usePathname();
//   const { cartItems } = useCart();

//   const toggleMenu = (): void => {
//     setIsOpen((prev) => !prev);
//   };

//   const toggleSearch = (): void => {
//     setSearchOpen((prev) => !prev);
//     setSearchQuery(""); // Reset search on toggle
//     setSuggestions([]); // Clear suggestions when closing
//   };

//   const checkAuth = async () => {
//     try {
//       const res = await axios.get("/api/users/me");
//       setIsAuthenticated(!!res.data.data);
//     } catch {
//       setIsAuthenticated(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.get("/api/users/logout");
//       toast.success("Logout successful");
//       setIsAuthenticated(false);
//       router.push("/login");
//     } catch (error: any) {
//       console.error("Logout error:", error.message);
//       toast.error("Failed to logout");
//     }
//   };

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);

//     if (query.trim().length === 0) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await axios.get("/public/Veg_Fruits.json");
//       const filteredItems = response.data.filter((item: Item) =>
//         item.name.toLowerCase().includes(query.toLowerCase()) ||
//         item.category.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(filteredItems);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   const handleSuggestionClick = (item: Item) => {
//     router.push(`/item/${item.name}`);
//     setSearchOpen(false);
//   };

//   return (
//     <nav className="bg-teal-600 p-4 relative">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo and Title */}
//         <div className="flex items-center">
//           <Image
//             src="/images/logo1.jpg"
//             alt="Logo"
//             className="rounded-3xl h-12 w-12 mr-2"
//             width={40}
//             height={40}
//           />
//           <span className="hidden md:block text-white text-4xl font-bold">
//             <span className="text-purple-300">Krishi</span>
//             <span className="text-white">Mart</span>
//           </span>
//         </div>

//         {/* Search and Cart Icons */}
//         <div className="flex items-center space-x-4">
//           <button onClick={toggleSearch} className="text-white">
//             <FaSearch size={24} />
//           </button>
//           <Link href="/cart" className="relative text-white ml-4">
//             <FaShoppingCart size={24} />
//             {cartItems.length > 0 && (
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-4">
//           <Link href="/wishlist" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Wishlist
//           </Link>
//           <Link href="/veggies" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Veggies
//           </Link>
//           <Link href="/fruits" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Fruits
//           </Link>
//           <Link href="/seller" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Seller
//           </Link>
//           {isAuthenticated ? (
//             <button
//               onClick={logout}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link href="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//               Sign In
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Search Input */}
//       {searchOpen && (
//         <div className="relative mt-2">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="Search items..."
//             className="w-full p-2 border rounded"
//           />
//           {/* Suggestions Dropdown */}
//           {suggestions.length > 0 && (
//             <div className="absolute w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto z-50">
//               {suggestions.map((item) => (
//                 <div
//                   key={item.name}
//                   onClick={() => handleSuggestionClick(item)}
//                   className="p-2 cursor-pointer hover:bg-teal-100"
//                 >
//                   {item.name} - {item.category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Header;
