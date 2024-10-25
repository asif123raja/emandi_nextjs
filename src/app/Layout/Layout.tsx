// src/app/layout.tsx

import React from "react";
import { CartProvider } from "@/context/CartContext"; // Adjust the import path as needed
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
};

export default Layout;
