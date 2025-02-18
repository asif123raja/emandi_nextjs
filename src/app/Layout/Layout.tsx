"use client";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

// Optional: Export metadata if needed
export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
