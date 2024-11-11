import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request) {
  try {
    // Fetch all items with only the necessary fields: ID, name, and any other details for the UI
    const items = await Product.find({}, 'id name price stock_quantity'); // Adjust fields as necessary

    return NextResponse.json({
      message: "Items fetched successfully",
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
