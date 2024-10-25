"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SellerSignup = () => {
  const router = useRouter();
  const [seller, setSeller] = useState({
    email: "",
    password: "",
    username: "",
    shopName: "",
    shopAddress: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/ssignup", seller);
  
      if (response.status === 200) {
        console.log("Signup successful", response.data);
        router.push("/login");
      } else {
        console.log(`Signup failed with status: ${response.status}`);
        console.log("Response data:", response.data);
      }
    } catch (error: any) {
      console.log("Signup failed", error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (seller.email && seller.password && seller.username && seller.shopName && seller.shopAddress) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [seller]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-4">{loading ? "Processing" : "Seller Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={seller.username}
        onChange={(e) => setSeller({ ...seller, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={seller.email}
        onChange={(e) => setSeller({ ...seller, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={seller.password}
        onChange={(e) => setSeller({ ...seller, password: e.target.value })}
        placeholder="Password"
      />
      <label htmlFor="shopName">Shop Name</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="shopName"
        value={seller.shopName}
        onChange={(e) => setSeller({ ...seller, shopName: e.target.value })}
        placeholder="Shop Name"
      />
      <label htmlFor="shopAddress">Shop Address</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="shopAddress"
        value={seller.shopAddress}
        onChange={(e) => setSeller({ ...seller, shopAddress: e.target.value })}
        placeholder="Shop Address"
      />
      <button
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login"> Visit Login Page</Link>
    </div>
  );
};

export default SellerSignup;
