import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "@/models/userModel"; // Your user model

export const authOptions = {
  providers: [
    Providers.Credentials({
      // Your credential configuration here
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Add user ID to the session
      return session;
    },
    async signIn(user) {
      // Additional sign-in logic if needed
      return true;
    },
  },
};

export default NextAuth(authOptions);
