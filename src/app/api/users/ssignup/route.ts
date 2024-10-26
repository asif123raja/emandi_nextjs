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
import Seller from '@/models/sellerModel'; // Ensure this is your correct path to the Seller model
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: NextApiRequest, response: NextApiResponse) => {
  await connect();

  upload.single('passportPhoto')(request, response, async (err) => {
    if (err) {
      return NextResponse.json({ error: "File upload failed" }, { status: 400 });
    }

    const {
      username,
      email,
      password,
      contactNumber,
      businessRegNumber,
      taxIdNumber,
      regionOfOperation,
      bankAccountDetails,
      businessLicenseNumber,
      pinCode,
    } = request.body;

    if (!request.file) {
      return NextResponse.json({ error: "Passport photo is required" }, { status: 400 });
    }

    // Upload to Cloudinary
    let passportPhotoUrl = '';
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        uploadStream.end(request.file.buffer);
      });

      passportPhotoUrl = (uploadResult as any).secure_url; // Ensure proper typing
    } catch (uploadError) {
      return NextResponse.json({ error: "Error uploading to Cloudinary" }, { status: 500 });
    }

    // Create new seller
    try {
      const newSeller = await Seller.create({
        username,
        email,
        password,
        contactNumber,
        businessRegNumber,
        taxIdNumber,
        regionOfOperation,
        bankAccountDetails,
        businessLicenseNumber,
        pinCode,
        passportPhoto: passportPhotoUrl,
      });

      return NextResponse.json({ message: "Signup successful", seller: newSeller }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Signup failed", details: error.message }, { status: 400 });
    }
  });
};
