
// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";
// import SellerItemQuantity from "@/models/itemQuantities"; // Ensure correct import path
// import Product from "@/models/productModel"; // Ensure correct import path
// import mongoose from "mongoose"; // Import mongoose for ObjectId conversion

// connect(); // Ensure database is connected

// export async function GET(request: NextRequest) {
//     try {
//         // Extract pincode from query parameters
//         const { searchParams } = new URL(request.url);
//         const pinCode = searchParams.get("pincode");

//         if (!pinCode) {
//             return NextResponse.json({ error: "Pincode is required" }, { status: 400 });
//         }

//         // Find all seller records matching the given pincode
//         const sellersWithProducts = await SellerItemQuantity.find({ pinCode });

//         if (!sellersWithProducts.length) {
//             return NextResponse.json({ message: "No products found for this pincode" }, { status: 404 });
//         }

//         // Collect all unique product IDs from seller records
//         const productIds = new Set<string>(); // Use Set to prevent duplicate queries
//         for (const seller of sellersWithProducts) {
//             for (const item of seller.itemQuantities) {
//                 productIds.add(item.itemId.toString());
//             }
//         }

//         // Fetch all matching products in a single query
//         const products = await Product.find({ _id: { $in: Array.from(productIds) } }).select("name _id");

//         // Create a map of productId -> product name for quick lookup
//         const productMap = new Map(products.map(product => [product._id.toString(), product.name]));

//         // Construct response data
//         let productQuantities: { itemId: string; name: string; quantity: number }[] = [];

//         for (const seller of sellersWithProducts) {
//             for (const item of seller.itemQuantities) {
//                 const productName = productMap.get(item.itemId.toString()) || "Unknown Product"; // Handle missing products
//                 productQuantities.push({
//                     itemId: item.itemId.toString(),
//                     name: productName,
//                     quantity: item.quantity,
//                 });
//             }
//         }

//         return NextResponse.json({ products: productQuantities });

//     } catch (error: any) {
//         console.error("Error fetching product quantities:", error.message);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import SellerItemQuantity from "@/models/itemQuantities";
import Product from "@/models/productModel";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pinCode = searchParams.get("pincode");

        if (!pinCode) {
            return NextResponse.json({ error: "Pincode is required" }, { status: 400 });
        }

        const sellersWithProducts = await SellerItemQuantity.find({ pinCode });

        if (!sellersWithProducts.length) {
            return NextResponse.json({ message: "No products found for this pincode" }, { status: 404 });
        }

        const productIds = new Set<mongoose.Types.ObjectId>();

        for (const seller of sellersWithProducts) {
            for (const item of seller.itemQuantities) {
                if (mongoose.Types.ObjectId.isValid(item.itemId)) {
                    productIds.add(new mongoose.Types.ObjectId(item.itemId)); // Ensure correct ObjectId format
                } else {
                    console.warn("Invalid ObjectId detected:", item.itemId);
                }
            }
        }

        console.log("Fetching products for IDs:", Array.from(productIds).map(id => id.toString()));

        const products = await Product.find({ _id: { $in: Array.from(productIds) } }).select("name _id");

        console.log("Fetched Products:", products);

        const productMap = new Map(products.map(product => [product._id.toString(), product.name]));

        let productQuantities: { itemId: string; name: string; quantity: number }[] = [];

        for (const seller of sellersWithProducts) {
            for (const item of seller.itemQuantities) {
                const productName = productMap.get(item.itemId.toString()) || "Unknown Product";
                console.log(`Item ID: ${item.itemId}, Product Name: ${productName}`);

                productQuantities.push({
                    itemId: item.itemId.toString(),
                    name: productName,
                    quantity: item.quantity,
                });
            }
        }

        return NextResponse.json({ products: productQuantities });

    } catch (error: any) {
        console.error("Error fetching product quantities:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
