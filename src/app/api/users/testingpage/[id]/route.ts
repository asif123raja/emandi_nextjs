// // src/app/api/products/[id]/route.ts
// import { connect } from '@/dbConfig/dbConfig'; // Adjust to your dbConfig path
// import Product from '@/models/itemModel'; // Adjust to your product model path
// import { NextResponse } from 'next/server';

// export const GET = async (request: Request, { params }: { params: { id: string } }) => {
//   await connect();

//   try {
//     const product = await Product.findById(params.id);

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
//   }
// };

// src/app/api/item/[id]/route.ts
import { connect } from '@/dbConfig/dbConfig';
import Item from '@/models/itemModel';
import { NextRequest, NextResponse } from 'next/server';

connect();  // Ensure connection is established when module is loaded

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Extract the item ID from the request parameters
        const { id } = params;
        if (!id) {
            throw new Error("Item ID not provided in the request");
        }

        // Fetch item details from the database
        const item = await Item.findOne({ id:"1" }).exec();
        if (!item) {
            console.log("Item not found for ID:", id);
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        console.log("Item found:", item);
        return NextResponse.json({
            message: "Item found",
            data: item
        });

    } catch (error: any) {
        console.error("Error fetching item details:", error.message);
        return NextResponse.json({ error: "Error fetching item", details: error.message }, { status: 500 });
    }
}
