import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel'; // Adjust the import if necessary
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all items from the database
        const items = await Product.find({});
        
        return NextResponse.json({
            message: "Items fetched successfully",
            success: true,
            items,
        });
    } catch (error: any) {
        console.error("Error fetching items:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
// import { getDataFromToken } from "@/helpers/getDataFromToken";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";
// import Seller from "@/models/sellersmodel";
// import SellerItemQuantity from "@/models/itemQuantities";
// import { connect } from "@/dbConfig/dbConfig";
// import Product from "@/models/productModel";

// connect();

// export async function GET(request: NextRequest) {
//   try {
//     // Extract user ID from token
//     const userId = await getDataFromToken(request);
//     if (!userId) {
//       throw new Error("Invalid token or user ID not found");
//     }

//     // Fetch user's pincode
//     const user = await User.findById(userId).select("pincode");
//     if (!user || !user.pincode) {
//       throw new Error("User not found or pincode not available");
//     }

//     // Find seller(s) based on pincode
//     const sellers = await Seller.find({ pincode: user.pincode });
//     if (!sellers.length) {
//       throw new Error("No sellers found for this pincode");
//     }

//     // Find the item quantities for the found seller(s)
//     const sellerIds = sellers.map((seller) => seller._id);
//     const sellerItemQuantities = await SellerItemQuantity.find({
//       sellerId: { $in: sellerIds },
//       pinCode: user.pincode,
//     }).populate("itemQuantities.itemId"); // Populate itemId to access Product details

//     // Format the data for frontend with quantity from SellerItemQuantity and other details from Product
//     const itemsWithQuantities = sellerItemQuantities.flatMap((siq) =>
//       siq.itemQuantities.map((itemQuantity) => {
//         const product = itemQuantity.itemId; // The populated Product data
//         return {
//           itemId: product._id,
//           name: product.name,
//           image_url: product.image_url,
//           description: product.description,
//           calories: product.calories,
//           protein: product.protein,
//           vitamins: product.vitamins,
//           minerals: product.minerals,
//           price: product.price,
//           discounted_price: product.discounted_price,
//           currency: product.currency,
//           quantity: itemQuantity.quantity, // Quantity from SellerItemQuantity
//         };
//       })
//     );

//     // Respond with the items and their quantities
//     return NextResponse.json({
//       message: "Items with quantities fetched successfully",
//       itemsWithQuantities,
//     });

//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
