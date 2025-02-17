// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import Seller from "@/models/sellersmodel";
// import Product from "@/models/productModel";
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth/authOptions"; // Ensure this path is correct

// // Connect to the database
// connect();

// export async function GET(request: NextRequest) {
//   try {
//     // Get pincode from query params
//     const pincode = request.nextUrl.searchParams.get("pincode");

//     let userPincode = pincode;

//     // If no pincode in query params, get it from the user session
//     if (!pincode) {
//       const userSession = await getServerSession(authOptions); // Corrected usage
//       if (!userSession?.user) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//       }

//       const user = await User.findById(userSession.user.id, "pincode");
//       if (!user?.pincode) {
//         return NextResponse.json({ message: "User pincode not found" }, { status: 400 });
//       }

//       userPincode = user.pincode;
//     }

//     // Find all sellers in the user's pincode
//     const sellersInPincode = await Seller.find({ pincode: userPincode }, "_id");
//     if (!sellersInPincode.length) {
//       return NextResponse.json({ message: "No sellers found in this pincode" }, { status: 404 });
//     }

//     const sellerIds = sellersInPincode.map(seller => seller._id);

//     // Find all products from sellers in the user's pincode (fetch only required fields)
//     const products = await Product.find({ sellerId: { $in: sellerIds } }, "name price stock_quantity image_url").lean();

//     return NextResponse.json({
//       success: true,
//       products,
//     });

//   } catch (error: any) {
//     console.error("Error fetching products:", error.message);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
