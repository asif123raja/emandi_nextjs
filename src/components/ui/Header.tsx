// "use client";
// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
// import Link from "next/link";
// import Image from 'next/image';
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter, usePathname } from "next/navigation";
// import { useCart } from "@/context/CartContext"; 

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState<string | null>(null); // Store role in a single state variable
//   const router = useRouter();
//   const { cartItems = [] } = useCart(); // Ensure cartItems is always an array

//   useEffect(() => {
//     const checkAuth = async () => {
//         try {
//             // Call both APIs in parallel
//             const [res1, res2] = await Promise.allSettled([
//                 axios.get('/api/users/me2'),
//                 axios.get('/api/users/me')
//             ]);

//             let userRole = null;

//             // Check which response has a valid role
//             if (res1.status === "fulfilled" && res1.value.data?.data?.role) {
//                 userRole = res1.value.data.data.role;
//                 console.log("Role found in /api/users/me2:", userRole);
//             } else if (res2.status === "fulfilled" && res2.value.data?.data?.role) {
//                 userRole = res2.value.data.data.role;
//                 console.log("Role found in /api/users/me:", userRole);
//             }

//             if (userRole) {
//                 setIsAuthenticated(true);
//                 setRole(userRole);
//             } else {
//                 setIsAuthenticated(false);
//                 setRole(null);
//             }
//         } catch (error) {
//             setIsAuthenticated(false);
//             setRole(null);
//             console.error("Authentication error:", error);
//         }
//     };

//     checkAuth();
// }, []);


  // const logout = async () => {
  //   try {
      // await axios.get('/api/users/logout');
      // toast.success("Logout successful");
  //     setIsAuthenticated(false);
  //     setRole(null);
  //     router.push('/login'); 
  //   } catch (error: any) {
  //     console.error("Logout error:", error.message);
  //     toast.error("Failed to logout");
  //   }
  // };

//   return (
//     <nav className="bg-teal-500 p-4 relative m-2 rounded-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Image
//             src="/images/logo1.jpg"
//             alt="Logo"
//             className="rounded-3xl h-12 w-12 mr-2"
//             width={40} height={40}
//           />
//           <span className="hidden md:block text-white text-4xl font-bold">
//             <span className="text-purple-300">Krishi</span>
//             <span className="text-white">Mart</span>
//           </span>
//         </div>

//         {/* Mobile Menu & Cart */}
//         <div className="flex items-center md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="text-white">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>

//           {role !== "Seller" && (
//             <Link href="/cart" className="relative text-white ml-4 mt-1">
//               <FaShoppingCart size={24} />
//               {cartItems.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           )}
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-4">
//           {role === "User" && (
//             <>
//               <Link href="/wishlist" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Wishlist
//               </Link>
//               <Link href="/veggies" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Veggies
//               </Link>
//               <Link href="/fruits" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Fruits
//               </Link>
//               <Link href="/allitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 All Items
//               </Link>
//               <Link href="/helpsection" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Help Section
//               </Link>
//               <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
//                 Logout
//               </button>
//             </>
//           )}

//           {role === "Seller" && (
//             <>
//               <Link href="/createitem" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Create New Item
//               </Link>
//               <Link href="/updateitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//                 Update Item
//               </Link>
//               <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
//                 Logout
//               </button>
//             </>
//           )}

//           {/* Auth Buttons */}
//           {!isAuthenticated && (
//             <Link href="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
//               Sign In
//             </Link>
//           )}

//           {/* Cart for buyers */}
//           {role === "User" && (
//             <Link href="/cart" className="relative text-white ml-4 mt-1">
//               <FaShoppingCart size={24} />
//               {cartItems.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
//           <div className="fixed top-0 right-0 h-full w-3/4 bg-teal-800 z-50 p-6 shadow-lg">
//             <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
//               <FaTimes size={30} />
//             </button>

//             {role === "User" && (
//               <>
//                 <Link href="/wishlist" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Wishlist
//                 </Link>
//                 <Link href="/veggies" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Veggies
//                 </Link>
//                 <Link href="/fruits" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Fruits
//                 </Link>
//                 <Link href="/allitems" className="block text-white text-lg py-4 hover:text-teal-300">
//                   All Items
//                 </Link>
//                 <Link href="/helpsection" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Help Section
//                 </Link>
//                 <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
//                 Logout
//                 </button>
//               </>
//             )}

//             {role === "Seller" && (
//               <>
//                 <Link href="/createitem" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Create New Item
//                 </Link>
//                 <Link href="/updateitems" className="block text-white text-lg py-4 hover:text-teal-300">
//                   Update Item
//                 </Link>
//                 <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
//                 Logout
//                 </button>
//               </>
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
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems = [] } = useCart();

  return (
    <nav className="bg-teal-500 p-4 relative m-2 rounded-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo1.jpg"
            alt="Logo"
            className="rounded-3xl h-12 w-12 mr-2"
            width={40} height={40}
          />
          <span className="hidden md:block text-white text-4xl font-bold">
            <span className="text-purple-300">Krishi</span>
            <span className="text-white">Mart</span>
          </span>
        </div>

        {/* Mobile Menu & Cart */}
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {role !== "Seller" && (
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {role === "User" && (
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
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Logout
              </button>
            </>
          )}

          {role === "Seller" && (
            <>
              <Link href="/createitem" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
                Create New Item
              </Link>
              <Link href="/updateitems" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
                Update Item
              </Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Logout
              </button>
            </>
          )}

          {/* Auth Buttons */}
          {!isAuthenticated && (
            <Link href="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md">
              Sign In/Signup
            </Link>
          )}

          {/* Cart for buyers */}
          {role === "User" && (
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

      {/* Mobile Navigation */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-3/4 bg-teal-800 z-50 p-6 shadow-lg">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
              <FaTimes size={30} />
            </button>

            {role === "User" && (
              <>
                <Link href="/wishlist" className="block text-white text-lg py-4 hover:text-teal-300">
                  Wishlist
                </Link>
                <Link href="/veggies" className="block text-white text-lg py-4 hover:text-teal-300">
                  Veggies
                </Link>
                <Link href="/fruits" className="block text-white text-lg py-4 hover:text-teal-300">
                  Fruits
                </Link>
                <Link href="/allitems" className="block text-white text-lg py-4 hover:text-teal-300">
                  All Items
                </Link>
                <Link href="/helpsection" className="block text-white text-lg py-4 hover:text-teal-300">
                  Help Section
                </Link>
                <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Logout
                </button>
              </>
            )}

            {role === "Seller" && (
              <>
                <Link href="/createitem" className="block text-white text-lg py-4 hover:text-teal-300">
                  Create New Item
                </Link>
                <Link href="/updateitems" className="block text-white text-lg py-4 hover:text-teal-300">
                  Update Item
                </Link>
                <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Logout
                </button>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
