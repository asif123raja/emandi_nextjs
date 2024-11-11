import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { Readable } from 'stream';

connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image'); // Get the image file from the form data

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    // Create a readable stream from the file buffer asynchronously
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer()); // Await inside an async function
    const stream = new Readable({
      read() {
        this.push(imageBuffer);
        this.push(null); // Signal the end of the stream
      }
    });

    // Upload the image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(`Cloudinary upload error: ${error.message}`);
          else resolve(result);
        }
      );

      stream.pipe(cloudinaryStream);
    });

    // Get the URL of the uploaded image
    const image_url = (uploadResult as any).secure_url;

    // Continue with the rest of your code here...
    const reqBody = {
      id: formData.get('id'),
      name: formData.get('name'),
      image_url,
      calories: formData.get('calories'),
      protein: formData.get('protein'),
      vitamins: JSON.parse(formData.get('vitamins') as string),
      minerals: JSON.parse(formData.get('minerals') as string),
      description: formData.get('description'),
      category: formData.get('category'),
      stock_quantity: formData.get('stock_quantity'),
      price: formData.get('price'),
      discounted_price: formData.get('discounted_price'),
      currency: formData.get('currency'),
      is_available: formData.get('is_available') === 'true',
    };

    // Check if a product with the same ID already exists
    const existingProduct = await Product.findOne({ id: reqBody.id });
    if (existingProduct) {
      return NextResponse.json({ error: "Product with this ID already exists" }, { status: 400 });
    }

    // Create and save the new product to the database
    const newProduct = new Product(reqBody);
    const savedProduct = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: savedProduct
    });

  } catch (error: any) {
    console.error("Error creating product:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
