// /src/app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    // Create a payment intent with INR as the currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount should be in subunits (e.g., paise for INR)
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
