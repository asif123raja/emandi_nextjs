import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Seller from "@/models/sellersmodel";
import Product from "@/models/productModel"; 
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    // Get pincode from query params
    const pincode = request.nextUrl.searchParams.get('pincode');

    if (!pincode) {
      return NextResponse.json({ message: "Pincode is required" }, { status: 400 });
    }

    // Find all sellers in the user's pincode
    const sellersInPincode = await Seller.find({ pincode });
    if (!sellersInPincode.length) {
      return NextResponse.json({ message: "No sellers found in this pincode" }, { status: 404 });
    }

    const sellerIds = sellersInPincode.map(seller => seller._id);

    // Find all products from sellers in the user's pincode
    const products = await Product.find({ sellerId: { $in: sellerIds } }).populate('sellerId');

    return NextResponse.json({
      success: true,
      products,
    });

  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
