// // pages/api/users/sellerSignup.ts
// import {connect} from '@/dbConfig/dbConfig';
// import Seller from '@/models/sellerModel';
// import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from "bcryptjs";

// connect();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const {username, email, password, shopName, shopAddress} = reqBody; // Updated fields

//         // Check if the seller already exists
//         const existingSeller = await Seller.findOne({email});
//         if (existingSeller) {
//             return NextResponse.json({error: "Seller already exists"}, {status: 400});
//         }

//         // Hash the password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         // Create a new seller
//         const newSeller = new Seller({
//             username,
//             email,
//             password: hashedPassword,
//             shopName, // Updated field
//             shopAddress, // Updated field
//         });

//         const savedSeller = await newSeller.save();

//         return NextResponse.json({message: "Seller created successfully", success: true, savedSeller});

//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500});
//     }
// }

// pages/api/users/sellerSignup.ts
// pages/api/users/signup.ts
import { connect } from '@/dbConfig/dbConfig'; // Ensure this is your correct path to dbConnect
import Seller from '@/models/sellersmodel'; // Ensure this is your correct path to the Seller model
import {  NextApiResponse } from 'next';
import { NextResponse,NextRequest } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';

export const POST = async (request: NextRequest, response: NextApiResponse) => {
  await connect();

  // Parse the request body
  const body = await request.json();

  // Log the request body for debugging
  console.log('Request Body:', body);

  const {
    username,
    email,
    password,
    contactNumber,
    businessRegNumber,
    taxIdNumber,
    regionOfOperation,
    businessLicenseNumber,
    pinCode,
    bankAccountDetails,
  } = body;
  const seller = await Seller.findOne({email})

        if(seller){
            console.log("seller already exist");
            return NextResponse.json({error: "seller already exists"}, {status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash 
        (password, salt) 
  // Ensure bankAccountDetails is defined and has the required fields
  if (!bankAccountDetails || !bankAccountDetails.accountNumber || !bankAccountDetails.bankName || !bankAccountDetails.ifscCode) {
    console.log("i am reacing at the bank");
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Validate required fields
  if (!username || !email || !password || !contactNumber || !businessRegNumber || !taxIdNumber || !regionOfOperation || !businessLicenseNumber || !pinCode) {
    console.log("i am reacing at the all details");
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Create new seller
  try {
    const newSeller = await Seller.create({
      username,
      email,
      password: hashedPassword,
      contactNumber,
      businessRegNumber,
      taxIdNumber,
      regionOfOperation,
      bankAccountDetails: {
        accountNumber: bankAccountDetails.accountNumber,
        bankName: bankAccountDetails.bankName,
        ifscCode: bankAccountDetails.ifscCode,
      },
      businessLicenseNumber,
      pinCode,
    });
    const savedSeller = await newSeller.save()

    console.log(savedSeller);
    await sendEmail({email,emailType:"VERIFY", userId: savedSeller._id})
    console.log("i am reacing at the 10");
    return NextResponse.json({ message: "Signup successful", seller: newSeller }, { status: 201 });
  } catch (error) {
    console.error('Error creating seller:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: "Signup failed", details: errorMessage }, { status: 400 });
  }
};
