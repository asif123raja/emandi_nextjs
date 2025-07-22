import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Seller from "@/models/sellersmodel"; // Ensure this is the correct import path
import { connect } from "@/dbConfig/dbConfig";

// Ensure database connection
connect();

export async function GET(request: NextRequest) {
    try {
        // console.log("access here")
        // Extract user ID from token
        const userId = await getDataFromToken(request);
        // console.log("userid",userId)
        if (!userId) {
            throw new Error("Invalid token or user ID not found");
        }
        // console.log("access here 2")
        // Fetch seller details
        const seller = await Seller.findOne({ _id: userId }); // Adjust according to your seller schema
        // console.log("access here 3", seller)
        if (!seller) {
            throw new Error("Seller not found");
        }
        // const isSeller = !!seller;
        const role="Seller";
        // console.log("here is the fact",isSeller);
        return NextResponse.json({
            message: "Seller found",
            data: {
                id: seller._id,
                email: seller.email,// Include necessary fields
                role: role,       // Adding role dynamically
            }
        });

    } catch (error: any) {
        console.error("Error fetching seller details:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
