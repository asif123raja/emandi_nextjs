// pages/api/users/sellerSignup.ts
import {connect} from '@/dbConfig/dbConfig';
import Seller from '@/models/sellerModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password, shopName, shopAddress} = reqBody; // Updated fields

        // Check if the seller already exists
        const existingSeller = await Seller.findOne({email});
        if (existingSeller) {
            return NextResponse.json({error: "Seller already exists"}, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new seller
        const newSeller = new Seller({
            username,
            email,
            password: hashedPassword,
            shopName, // Updated field
            shopAddress, // Updated field
        });

        const savedSeller = await newSeller.save();

        return NextResponse.json({message: "Seller created successfully", success: true, savedSeller});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
