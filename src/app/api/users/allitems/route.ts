import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel'; // Adjust the import if necessary
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all items from the database
        const items = await Product.find({});
        
        return NextResponse.json({
            message: "Items fetched successfully",
            success: true,
            items,
        });
    } catch (error: any) {
        console.error("Error fetching items:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
