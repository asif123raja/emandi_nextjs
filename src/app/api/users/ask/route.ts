// src/app/api/ask/route.ts

import { NextResponse } from "next/server";
import { analyzeImageForIngredients } from "./utils/analyzeImageForIngredients";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const form = formidable({ multiples: false });

  const formData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const question = formData.fields.question;
  let response = "";

  if (formData.files.image) {
    const imagePath = (formData.files.image as formidable.File).filepath;
    response = await analyzeImageForIngredients(imagePath);
  } else if (question) {
    response = `Text-based response for: ${question}`;
  }

  return NextResponse.json({ response });
}
