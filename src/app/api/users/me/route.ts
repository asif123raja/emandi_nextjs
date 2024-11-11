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
        console.log(user)
        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: any) {
        console.error("Error fetching user details:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
// import { getDataFromToken } from "@/helpers/getDataFromToken";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";
// import Seller from "@/models/sellersmodel"; // Ensure this is correctly defined
// import { connect } from "@/dbConfig/dbConfig";

// // Ensure database connection
// connect();

// export async function GET(request: NextRequest) {
//     try {
//         // Extract user ID from token
//         const userId = await getDataFromToken(request);
//         if (!userId) {
//             return NextResponse.json({ error: "Invalid token or user ID not found" }, { status: 401 });
//         }

//         // Fetch user details
//         const user = await User.findOne({ _id: userId }).select("-password");
//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         // Fetch seller details
//         const seller = await Seller.findOne({ userId: userId });
//         if (!seller) {
//             console.warn("Seller not found for user ID:", userId);
//         }
//         const isSeller = !!seller; // Boolean value to check if the user is a seller

//         // Return user data along with seller status
//         return NextResponse.json({
//             message: "User and seller details fetched successfully",
//             data: {
//                 user,
//                 isSeller // Add isSeller to the response
//             }
//         });

//     } catch (error: any) {
//         console.error("Error fetching user and seller details:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 }); // Adjusted status to 500 for internal errors
//     }
// }
