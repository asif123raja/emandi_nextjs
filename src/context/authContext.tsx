"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Import router
import axios from "axios";
import toast from "react-hot-toast";

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const [res1, res2] = await Promise.allSettled([
                    axios.get('/api/users/me2'),
                    axios.get('/api/users/me')
                ]);

                let userRole = null;

                if (res1.status === "fulfilled" && res1.value.data?.data?.role) {
                    userRole = res1.value.data.data.role;
                } else if (res2.status === "fulfilled" && res2.value.data?.data?.role) {
                    userRole = res2.value.data.data.role;
                }

                if (userRole) {
                    setIsAuthenticated(true);
                    setRole(userRole);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setRole(null);
            }
        };

        checkAuth();
    }, []);

    const login = (userRole: string) => {
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const logout =async () => {
        await axios.get('/api/users/logout');
        toast.success("Logout successful");
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem("token");
        router.push("/login");  // Redirect to login
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
