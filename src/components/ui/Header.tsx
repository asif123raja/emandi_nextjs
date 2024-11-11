// "use client";
// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
// import Link from "next/link";
// import Image from 'next/image';
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter, usePathname } from "next/navigation";
// import { useCart } from "@/context/CartContext"; // Import your CartContext to access cart items

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to track authentication
//   const router = useRouter();
//   const pathname = usePathname(); // Get current path
//   const { cartItems } = useCart(); // Access cart items from context

//   const toggleMenu = (): void => {
//     setIsOpen((prev) => !prev);
//   };

//   // Function to check authentication status
//   const checkAuth = async () => {
//     try {
//       const res = await axios.get('/api/users/me2'); // Update this with your API endpoint
//       setIsAuthenticated(!!res.data.data); // Set authentication status
//       console.log(isAuthenticated)
//     } catch {
//       setIsAuthenticated(false); // Set to false if an error occurs
//     }
//   };

//   // Call checkAuth on component mount
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.get('/api/users/logout'); // Update this with your logout endpoint
//       toast.success("Logout successful");
//       setIsAuthenticated(false); // Update state
//       router.push('/login'); // Redirect to login page
//     } catch (error: any) {
//       console.error("Logout error:", error.message);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <nav className="bg-teal-500 p-4 relative m-2 rounded-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <Image
//             src="/images/logo1.jpg" // Using the public path
//             alt="Logo"
//             className="rounded-3xl h-12 w-12 mr-2"
//             width={40}   // Adjust width based on your requirements
//             height={40}  // Adjust height based on your requirements
//           />
//           {/* Only show KrishiMart text on desktop */}
//           <span className="hidden md:block text-white text-4xl font-bold">
//             <span className="text-purple-300">Krishi</span>
//             <span className="text-white">Mart</span>
//           </span>
//         </div>

//         {/* Hamburger menu (for mobile view) */}
//         <div className="flex items-center md:hidden">
//           <button onClick={toggleMenu} className="text-white">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>

//           {/* Cart Icon with Badge in Mobile View */}
//           <Link href="/cart" className="relative text-white ml-4">
//             <FaShoppingCart size={24} />
//             {cartItems.length > 0 && (
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Header links (Desktop view only) */}
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
//           <Link href="/allitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             All Items
//           </Link>
//           <Link href="/seller" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Seller
//           </Link>
//           <Link href="/helpsection" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//             Help Section
//           </Link>

//           {/* Conditionally render Logout button if user is authenticated or if on Profile page */}
          // {(isAuthenticated|| pathname ==='/sellerProfile' || pathname === '/profile') ? (
          //   <button
          //     onClick={logout}
          //     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          //   >
          //     Logout
          //   </button>
          // ) : (
          //   <Link href="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
          //     Sign In
          //   </Link>
          // )}
//           <Link href="/cart" className="relative text-white ml-4 mt-1">
//             <FaShoppingCart size={24} />
//             {cartItems.length > 0 && (
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Dropdown menu (Mobile view, right side only) */}
//       {isOpen && (
//         <>
//           {/* Semi-transparent overlay covering the rest of the screen */}
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>

//           {/* Right side menu */}
//           <div className="fixed top-0 right-0 h-full w-3/4 bg-teal-800 z-50 p-6 shadow-lg">
//             <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
//               <FaTimes size={30} />
//             </button>

//             <Link href="/wishlist" className="block text-white text-lg py-4 hover:text-teal-300">
//               WishList
//             </Link>
//             <Link href="/veggies" className="block text-white text-lg py-4 hover:text-teal-300">
//               Veggies
//             </Link>
//             <Link href="/fruits" className="block text-white text-lg py-4 hover:text-teal-300">
//               Fruits
//             </Link>
//             <Link href="/allitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//               All Items
//             </Link>
//             <Link href="/helpsection" className="block text-white text-lg py-4 border border-white px-4 rounded hover:bg-white hover:text-teal-600">
//               Help Section
//             </Link>

//             {/* Conditionally render Logout button if user is authenticated or if on Profile page */}
//             {(isAuthenticated || pathname === '/profile') ? (
//               <button
//                 onClick={logout}
//                 className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link href="/login" className="block text-white text-lg py-4 hover:text-teal-300">
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Header;
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
  const [isSeller, setIsSeller] = useState<boolean>(false); // State to track if the user is a seller
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const { cartItems } = useCart(); // Access cart items from context
  
  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  // Function to check authentication status and seller status
  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/users/me2');
       //const res2 = await axios.get('/api/users/me'); // Update this with your API endpoint
      console.log("res.data.data",res.data.data);
      if (res.data.data) {
        
       // Update this with your API endpoint
        setIsAuthenticated(true)
        console.log("isauthinticated",isAuthenticated) // User is authenticated
        setIsSeller(res.data.data); // Set seller status based on API response
        console.log("isseller",res.data.data.isSeller)
      } else {
        setIsAuthenticated(false);
        setIsSeller(false);
      }
    } catch {
      setIsAuthenticated(false); // Set to false if an error occurs
      setIsSeller(false); // Ensure seller status is also false
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
      setIsSeller(false); // Reset seller status on logout
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
          <span className="hidden md:block text-white text-4xl font-bold">
            <span className="text-purple-300">Krishi</span>
            <span className="text-white">Mart</span>
          </span>
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {!isSeller && ( // Check if the user is NOT a seller
            <Link href="/cart" className="relative text-white ml-4 mt-1">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Render links based on authentication and seller status */}
        <div className="hidden md:flex space-x-4">
          { isSeller ? (
            <>
              <Link href="/createitem" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
                Create New Item
              </Link>
              <Link href="/updateitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
                Update Item
              </Link>
           {(isAuthenticated|| pathname ==='/sellerProfile' || pathname === '/profile') ? (
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
            </>
          ) : (
            <>
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
              <Link href="/helpsection" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
                Help Section
              </Link>
              {(isAuthenticated|| pathname ==='/sellerProfile' || pathname === '/profile') ? (
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
            </>
          )}
          {!isSeller && ( // Check if the user is NOT a seller
            <Link href="/cart" className="relative text-white ml-4 mt-1">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
          <div className="fixed top-0 right-0 h-full w-3/4 bg-teal-800 z-50 p-6 shadow-lg">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
              <FaTimes size={30} />
            </button>

            { isSeller ? (
              <>
                <Link href="/create-item" className="block text-white text-lg py-4 hover:text-teal-300">
                  Create New Item
                </Link>
                <Link href="/update-item" className="block text-white text-lg py-4 hover:text-teal-300">
                  Update Item
                </Link>
                {(isAuthenticated|| pathname ==='/sellerProfile' || pathname === '/profile') ? (
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
              </>
            ) : (
              <>
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
                
                {(isAuthenticated|| pathname ==='/sellerProfile' || pathname === '/profile') ? (
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
            
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
