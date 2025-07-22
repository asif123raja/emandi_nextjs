import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { CartProvider } from "@/context/CartContext";
import { TotalAmountProvider } from "@/context/TotalAmountContext";
import ChatbotIcon from "@/components/ui/chatbot";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <CartProvider>
          <TotalAmountProvider>
            <Header />
            <main className="p-4 md:p-8">{children}</main>
            <ChatbotIcon />
            <Footer />
          </TotalAmountProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

