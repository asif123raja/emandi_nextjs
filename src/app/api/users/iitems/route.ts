import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all items with necessary fields
    const items = await Product.find({}, 'id name price stock_quantity');

    return NextResponse.json({
      message: "Items fetched successfully",
      success: true,
      items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
