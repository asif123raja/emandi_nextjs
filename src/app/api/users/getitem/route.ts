import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all products from the database
        const products = await Product.find({});
        
        return NextResponse.json({
            message: "Products fetched successfully",
            success: true,
            products,
        });
    } catch (error: any) {
        console.error("Error fetching products:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
