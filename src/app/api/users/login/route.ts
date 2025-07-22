import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Seller from "@/models/sellersmodel";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        let user = await User.findOne({ email }) || 
                   await Seller.findOne({ email }) || 
                   await Admin.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        // Verify password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Determine role dynamically
        const role = user.constructor.modelName; // "User", "Seller", or "Admin"

        // Generate JWT Token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: role
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Create response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            role: role,
            token: token // Send token in response for frontend usage
        });

        // Store token in HttpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
