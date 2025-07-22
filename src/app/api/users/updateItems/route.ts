// import { connect } from '@/dbConfig/dbConfig';
// import mongoose from 'mongoose';
// import Seller from '@/models/sellersmodel';
// import SellerItemQuantity from '@/models/itemQuantities';
// import Product from '@/models/productModel';
// import { NextRequest, NextResponse } from 'next/server';

// connect();

// const { Types } = mongoose;
// const { ObjectId } = Types;

// function isValidObjectId(id: string): boolean {
//   return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { email, itemQuantities } = await request.json();

//     if (!email || !itemQuantities || !Array.isArray(itemQuantities)) {
//       return NextResponse.json({ error: "Email and item quantities are required" }, { status: 400 });
//     }

//     const seller = await Seller.findOne({ email });
//     if (!seller) {
//       return NextResponse.json({ error: "Seller not found" }, { status: 404 });
//     }

//     const sellerId = seller._id;
//     const pinCode = seller.pinCode;

//     const itemQuantitiesWithObjectId = await Promise.all(
//       itemQuantities.map(async (item) => {
//         const product = await Product.findById(item.itemId); // Assuming `itemId` is `_id`

//         if (!product) {
//           return null; // Skip invalid products
//         }

//         return {
//           itemId: product._id, // Store as ObjectId
//           quantity: item.quantity,
//         };
//       })
//     );

//     // Filter out null values (invalid product IDs)
//     const validItemQuantities = itemQuantitiesWithObjectId.filter(Boolean);

//     let record = await SellerItemQuantity.findOne({ sellerId, pinCode });

//     if (record) {
//       record.itemQuantities = validItemQuantities;
//       await record.save();
//     } else {
//       record = await SellerItemQuantity.create({ sellerId, pinCode, itemQuantities: validItemQuantities });
//     }

//     return NextResponse.json({
//       message: "Item quantities updated successfully",
//       success: true,
//       data: record,
//     });

//   } catch (error: any) {
//     console.error("Error updating item quantities:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// import { connect } from '@/dbConfig/dbConfig';
// import mongoose from 'mongoose';
// import Seller from '@/models/sellersmodel';
// import SellerItemQuantity from '@/models/itemQuantities';
// import Product from '@/models/productModel';
// import { NextRequest, NextResponse } from 'next/server';

// connect();

// const { Types } = mongoose;
// const { ObjectId } = Types;

// function isValidObjectId(id: string): boolean {
//   return ObjectId.isValid(id);
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { email, itemQuantities, pinCodes } = await request.json();

//     // Validate request body
//     if (!email || !Array.isArray(itemQuantities) || itemQuantities.length === 0) {
//       return NextResponse.json(
//         { error: 'Email and item quantities are required and should be valid' },
//         { status: 400 }
//       );
//     }

//     // Find the seller by email
//     const seller = await Seller.findOne({ email });
//     if (!seller) {
//       return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
//     }

//     const sellerId = seller._id;
//     const sellerPinCodes = seller.pinCode ? [seller.pinCode] : []; // Convert single pinCode to array

//     if (sellerPinCodes.length === 0) {
//       return NextResponse.json({ error: "Seller must have at least one associated pincode" }, { status: 400 });
//     }

//     // Restrict pincodes to a maximum of 10
//     if (pinCodes && pinCodes.length > 10) {
//       return NextResponse.json({ error: 'A seller can only associate up to 10 pincodes' }, { status: 400 });
//     }

//     // Validate each item
//     const validItemQuantities = await Promise.all(
//       itemQuantities.map(async (item) => {
//         if (!isValidObjectId(item.itemId)) return null; // Skip invalid IDs
//         const product = await Product.findById(item.itemId);
//         if (!product) return null; // Skip if product doesn't exist
//         return {
//           itemId: new ObjectId(product._id),
//           sellerSKU: item.sellerSKU || null, // Ensure sellerSKU is handled properly
//           quantity: Math.max(0, item.quantity), // Ensure non-negative quantity
//         };
//       })
//     );

//     // Filter out invalid products
//     const filteredItems = validItemQuantities.filter(Boolean);

//     if (filteredItems.length === 0) {
//       return NextResponse.json({ error: 'No valid items to update' }, { status: 400 });
//     }

//     // Check if seller's item quantity record exists
//     let sellerItemRecord = await SellerItemQuantity.findOne({ sellerId });

//     if (!sellerItemRecord) {
//       // Create new entry if it doesn't exist
//       sellerItemRecord = new SellerItemQuantity({
//         sellerId,
//         pinCode: sellerPinCodes[0] || "", // Set the first pinCode explicitly
//         pinCodes: sellerPinCodes,
//         itemQuantities: filteredItems,
//       });
//     } else {
//       // Ensure sellerItemRecord.pinCodes contains the seller's pincode
//       sellerItemRecord.pinCodes = Array.from(new Set([...sellerItemRecord.pinCodes, ...sellerPinCodes]));
//       sellerItemRecord.pinCode = sellerItemRecord.pinCodes[0] || ""; // Ensure pinCode is always set

//       filteredItems.forEach((newItem) => {
//         if (!newItem || !newItem.itemId) return; // Prevent null or undefined errors

//         const existingItem = sellerItemRecord.itemQuantities.find(
//           (item: { itemId: mongoose.Types.ObjectId; sellerSKU?: string | null; quantity: number }) =>
//             item.itemId.toString() === newItem.itemId.toString()
//         );

//         if (existingItem) {
//           // Update quantity if item exists
//           existingItem.quantity += newItem.quantity;
//         } else {
//           // Add new item with type safety
//           sellerItemRecord.itemQuantities.push({
//             itemId: new mongoose.Types.ObjectId(newItem.itemId), // Ensure it's a valid ObjectId
//             sellerSKU: newItem.sellerSKU ?? null, // Use null if sellerSKU is undefined
//             quantity: Math.max(0, newItem.quantity), // Ensure quantity is non-negative
//           });
//         }
//       });
//     }

//     // Log pincodes for debugging
//     console.log("PinCodes being saved:", sellerItemRecord.pinCodes);

//     // Save updated data
//     await sellerItemRecord.save();

//     return NextResponse.json({
//       message: 'Item quantities updated successfully',
//       success: true,
//       data: sellerItemRecord,
//     });
//   } catch (error: any) {
//     console.error('Error updating item quantities:', error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { connect } from '@/dbConfig/dbConfig';
import mongoose from 'mongoose';
import Seller from '@/models/sellersmodel';
import SellerItemQuantity from '@/models/itemQuantities';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

const { Types } = mongoose;
const { ObjectId } = Types;

function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

export async function POST(request: NextRequest) {
  try {
    const { email, itemQuantities, pinCodes } = await request.json();

    if (!email || !Array.isArray(itemQuantities) || itemQuantities.length === 0) {
      return NextResponse.json(
        { error: 'Email and item quantities are required and should be valid' },
        { status: 400 }
      );
    }

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const sellerId = seller._id;
    let sellerPinCodes = seller.pinCode ? [seller.pinCode] : []; // Ensure it's an array

    if (pinCodes && Array.isArray(pinCodes)) {
      sellerPinCodes = Array.from(new Set([...sellerPinCodes, ...pinCodes])); // Merge and remove duplicates
    }

    if (sellerPinCodes.length === 0) {
      return NextResponse.json({ error: "Seller must have at least one associated pincode" }, { status: 400 });
    }

    if (sellerPinCodes.length > 10) {
      return NextResponse.json({ error: 'A seller can only associate up to 10 pincodes' }, { status: 400 });
    }

    // Validate items
    const validItemQuantities = await Promise.all(
      itemQuantities.map(async (item) => {
        if (!isValidObjectId(item.itemId)) return null;
        const product = await Product.findById(item.itemId);
        if (!product) return null;
        return {
          itemId: new ObjectId(product._id),
          sellerSKU: item.sellerSKU || null,
          quantity: Math.max(0, item.quantity),
        };
      })
    );

    const filteredItems = validItemQuantities.filter(Boolean);
    if (filteredItems.length === 0) {
      return NextResponse.json({ error: 'No valid items to update' }, { status: 400 });
    }

    // Find existing seller item quantity record
    let sellerItemRecord = await SellerItemQuantity.findOne({ sellerId });

    if (!sellerItemRecord) {
      // Create new record
      sellerItemRecord = new SellerItemQuantity({
        sellerId,
        pinCode: sellerPinCodes[0] || "", // Assign the first pincode
        pinCodes: sellerPinCodes, // Ensure pinCodes is an array
        itemQuantities: filteredItems,
      });
    } else {
      // Ensure pinCodes is always an array
      sellerItemRecord.pinCodes = Array.isArray(sellerItemRecord.pinCodes) ? sellerItemRecord.pinCodes : [];
      sellerItemRecord.pinCodes = Array.from(new Set([...sellerItemRecord.pinCodes, ...sellerPinCodes]));
      sellerItemRecord.pinCode = sellerItemRecord.pinCodes[0] || "";

      filteredItems.forEach((newItem) => {
        if (!newItem || !newItem.itemId) return;

        const existingItem = sellerItemRecord.itemQuantities.find(
          (item: { itemId: mongoose.Types.ObjectId }) =>
            item.itemId.toString() === newItem.itemId.toString()
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          sellerItemRecord.itemQuantities.push({
            itemId: new ObjectId(newItem.itemId),
            sellerSKU: newItem.sellerSKU ?? null,
            quantity: Math.max(0, newItem.quantity),
          });
        }
      });
    }

    console.log("PinCodes being saved:", sellerItemRecord.pinCodes);

    // Save updated record
    await sellerItemRecord.save();

    return NextResponse.json({
      message: 'Item quantities updated successfully',
      success: true,
      data: sellerItemRecord,
    });
  } catch (error: any) {
    console.error('Error updating item quantities:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
