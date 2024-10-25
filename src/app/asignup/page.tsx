
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminSignup = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/asignup", admin);

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
    if (admin.email && admin.password && admin.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [admin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-4">{loading ? "Processing" : "Admin Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={admin.username}
        onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={admin.email}
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={admin.password}
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        placeholder="Password"
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

export default AdminSignup;
