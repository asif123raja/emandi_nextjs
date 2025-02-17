import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageAnnotatorClient } from "@google-cloud/vision";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Google Generative AI client
const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY;
if (!apiKey) {
  throw new Error("Missing GOOGLE_GENERATIVE_AI_KEY environment variable");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const question = formData.get("question") as string;
    let imageUrl = "";
    let foodInsights = "";

    // 1. Image Handling
    if (image) {
      console.log("Image received, starting upload...");
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          cloudinaryStream.end(imageBuffer);
        });

        imageUrl = (uploadResult as any).secure_url;
        console.log("Image uploaded successfully:", imageUrl);

        // 2. Image Analysis using labelDetection (substitute for foodAnalysis)
        const client = new ImageAnnotatorClient();
        console.log("Calling Cloud Vision API...");
        const [result] = await client.labelDetection({
          image: { source: { imageUri: imageUrl } },
        });

        console.log("Cloud Vision response:", result);

        if (result.labelAnnotations && result.labelAnnotations.length > 0) {
          // Optionally, filter for food-related labels if needed.
          foodInsights = result.labelAnnotations
            .map((label) => label.description)
            .join(", ");
          console.log("Food Insights:", foodInsights);
        } else {
          console.log("No label annotations found in the image.");
        }
      } catch (uploadError) {
        console.error("Error during image upload or analysis:", uploadError);
        return NextResponse.json(
          { error: "Error processing image." },
          { status: 500 }
        );
      }
    }

    // 3. Prompt Construction
    let prompt = "";
    if (foodInsights) {
      prompt = `Provide a recipe based on these ingredients: ${foodInsights}.`;
    } else if (question) {
      prompt = `Provide a recipe for this question: ${question}`;
    }
    console.log("Generated Prompt:", prompt);

    // 4. Call Gemini (if prompt is available)
    if (prompt) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const geminiResponse = await model.generateContent(prompt);

        console.log("Gemini Response:", geminiResponse.response.text());

        return NextResponse.json(
          {
            response: geminiResponse.response.text().slice(0, 10000),
          },
          { status: 200 }
        );
      } catch (geminiError) {
        console.error("Error calling Gemini:", geminiError);
        return NextResponse.json(
          { error: "Error generating recipe." },
          { status: 500 }
        );
      }
    } else {
      console.log("No prompt generated. Sending empty response.");
      return NextResponse.json(
        { response: "Please provide an image or a question." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Unexpected error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request." },
      { status: 500 }
    );
  }
}


//auth
// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import User from "@/models/userModel"; // Your user model

// export const authOptions = {
//   providers: [
//     Providers.Credentials({
//       // Your credential configuration here
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       session.user.id = user.id; // Add user ID to the session
//       return session;
//     },
//     async signIn(user) {
//       // Additional sign-in logic if needed
//       return true;
//     },
//   },
// };

// export default NextAuth(authOptions);
