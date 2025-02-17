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

    const itemQuantitiesWithObjectId = await Promise.all(
      itemQuantities.map(async (item) => {
        const product = await Product.findById(item.itemId); // Assuming `itemId` is `_id`

        if (!product) {
          return null; // Skip invalid products
        }

        return {
          itemId: product._id, // Store as ObjectId
          quantity: item.quantity,
        };
      })
    );

    // Filter out null values (invalid product IDs)
    const validItemQuantities = itemQuantitiesWithObjectId.filter(Boolean);

    let record = await SellerItemQuantity.findOne({ sellerId, pinCode });

    if (record) {
      record.itemQuantities = validItemQuantities;
      await record.save();
    } else {
      record = await SellerItemQuantity.create({ sellerId, pinCode, itemQuantities: validItemQuantities });
    }

    return NextResponse.json({
      message: "Item quantities updated successfully",
      success: true,
      data: record,
    });

  } catch (error: any) {
    console.error("Error updating item quantities:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
