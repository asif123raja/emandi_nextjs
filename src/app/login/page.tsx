"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/authContext"; // Import AuthContext

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth(); // Get login function from AuthContext

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");

            // Update AuthContext
            login(response.data.role);
            const { role } = response.data;
            if (role === 'User') {
                router.push("/profile");
            } else if (role === 'Seller') {
                router.push("/sellerProfile");
            } else if (role === 'Admin') {
                router.push("/adminProfile");
            } else {
                router.push("/profile"); // Fallback
            }

            // Redirect based on role (handled by AuthContext)
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />

            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <Link href="/signup">Visit Signup page</Link>
        </div>
    );
}
