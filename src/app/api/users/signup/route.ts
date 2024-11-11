import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, pincode } = reqBody;
        console.log("yeah here",reqBody);
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user with pincode
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            pincode
        });
        console.log("newuser",newUser);
        const savedUser = await newUser.save();
        console.log("here saved use",savedUser);
        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        console.log("user created successfully");
        return NextResponse.json({ message: "User created successfully", success: true, savedUser });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
