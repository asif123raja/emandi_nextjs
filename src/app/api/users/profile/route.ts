import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Seller from "@/models/sellersmodel";
import Product from "@/models/productModel"; // Adjusted to use Product model instead of Item
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    const { pincode } = request.nextUrl.searchParams; // Get pincode from query params

    // Fetch user profile (pincode) if not passed in query
    let userPincode;
    if (!pincode) {
      const userSession = await getSession({ req: request });
      if (!userSession || !userSession.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const user = await User.findById(userSession.user.id, "pincode");
      userPincode = user?.pincode;
    }

    // Find all sellers in the user's pincode
    const sellersInPincode = await Seller.find({ pincode: userPincode });
    const sellerIds = sellersInPincode.map(seller => seller._id);

    // Find all products from sellers in the user's pincode
    const products = await Product.find({ seller: { $in: sellerIds } }).populate('seller');
    
    return NextResponse.json({
      success: true,
      products, // Return products instead of items
    });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
