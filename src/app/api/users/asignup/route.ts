// pages/api/users/adminSignup.ts
import {connect} from '@/dbConfig/dbConfig';
import Admin from '@/models/adminModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({email});
        if (existingAdmin) {
            return NextResponse.json({error: "Admin already exists"}, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new admin
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();

        return NextResponse.json({message: "Admin created successfully", success: true, savedAdmin});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
