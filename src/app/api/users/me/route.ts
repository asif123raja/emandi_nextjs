import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getDataFromToken(request);
        if (!userId) {
            throw new Error("Invalid token or user ID not found");
        }

        // Fetch user details
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            throw new Error("User not found");
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: any) {
        console.error("Error fetching user details:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
