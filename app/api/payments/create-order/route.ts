import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", bookingId, eventId } = body;

    if (!amount || !bookingId || !eventId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate receipt ID (max 40 characters for Razorpay)
    // Format: bk_[first10chars]_[last6digits] = max 20 chars
    const timestamp = Date.now().toString();
    const shortBookingId = bookingId.substring(0, 10);
    const shortTimestamp = timestamp.slice(-6);
    const receipt = `bk_${shortBookingId}_${shortTimestamp}`;

    const options = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: receipt, // Max 40 characters
      notes: {
        bookingId,
        eventId,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
