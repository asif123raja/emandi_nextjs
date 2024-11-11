"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    pincode: "", // New field for pincode
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await Axios.post("/api/users/signup", user);
      
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
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username && user.pincode) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-4">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <label htmlFor="pincode">Pincode</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="pincode"
        value={user.pincode}
        onChange={(e) => setUser({ ...user, pincode: e.target.value })}
        placeholder="Pincode"
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

export default Signup;
