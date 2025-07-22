import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getDataFromToken(request);
        console.log("userid here it is",userId)
        if (!userId) {
            throw new Error("Invalid token or user ID not found");
        }

        // Fetch user details
        console.log("accesee 22")
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            throw new Error("User not found");
        }
        const role="User";
        console.log(user)
        return NextResponse.json({
            message: "User found",
            data: {
                id: user._id,
                email: user.email,
                name: user.name,  // Include necessary fields
                role: role,       // Adding role dynamically
            }
            
        });

    } catch (error: any) {
        console.error("Error fetching user details:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
