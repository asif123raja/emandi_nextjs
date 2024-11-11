import { connect } from '@/dbConfig/dbConfig';
import mongoose from 'mongoose';
import Seller from '@/models/sellersmodel';
import SellerItemQuantity from '@/models/itemQuantities';
import Product from '@/models/productModel'; // Assuming you have a Product model
import { NextRequest, NextResponse } from 'next/server';

connect();

const { Types } = mongoose;
const { ObjectId } = Types;

function isValidObjectId(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function POST(request: NextRequest) {
  try {
    const { email, itemQuantities } = await request.json();

    if (!email || !itemQuantities || !Array.isArray(itemQuantities)) {
      return NextResponse.json({ error: "Email and item quantities are required" }, { status: 400 });
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    const sellerId = seller._id;
    const pinCode = seller.pinCode;

    const itemQuantitiesWithObjectId = await Promise.all(itemQuantities.map(async (item) => {
      const product = await Product.findOne({ id: item.itemId }); // Adjust to find by 'id' or use `_id` if needed

      if (!product) {
        throw new Error(`Product not found for itemId: ${item.itemId}`);
      }

      const itemId = product._id; // This gets the actual MongoDB ObjectId

      return {
        itemId: itemId, // Use the ObjectId directly
        quantity: item.quantity,
      };
    }));

    let record = await SellerItemQuantity.findOne({ sellerId, pinCode });

    if (record) {
      record.itemQuantities = itemQuantitiesWithObjectId;
      await record.save();
    } else {
      record = await SellerItemQuantity.create({ sellerId, pinCode, itemQuantities: itemQuantitiesWithObjectId });
    }

    return NextResponse.json({
      message: "Item quantities updated successfully",
      success: true,
      data: record,
    });

  } catch (error) {
    console.error("Error updating item quantities:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
