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

    // If amount not provided, try to derive from event data
    let orderAmount = amount;
    if ((!orderAmount || orderAmount === 0) && eventId) {
      try {
        // Import event data and look up ticket price (in main currency units)
        const { events } = await import("../../../../data/events");
        const ev = events.find((e: any) => e.id === eventId);
        if (ev && typeof ev.ticketPrice === "number") {
          // convert to paise/cents
          orderAmount = ev.ticketPrice * 100;
        }
      } catch (err) {
        console.warn("Could not derive amount from events data", err);
      }
    }

    if (!orderAmount || !bookingId || !eventId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

  // Prevent using Razorpay test keys in production
  if (process.env.NODE_ENV === "production") {
    const keyId = process.env.RAZORPAY_KEY_ID || "";
    if (keyId.startsWith("rzp_test_")) {
      console.error("Razorpay test key used in production - refusing to create order.");
      return NextResponse.json({ success: false, error: "Payment misconfiguration: test key in production" }, { status: 500 });
    }
  }

    // Generate receipt ID (max 40 characters for Razorpay)
    // Format: bk_[first10chars]_[last6digits] = max 20 chars
    const timestamp = Date.now().toString();
    const shortBookingId = bookingId.substring(0, 10);
    const shortTimestamp = timestamp.slice(-6);
    const receipt = `bk_${shortBookingId}_${shortTimestamp}`;

    const options = {
      amount: orderAmount, // Amount in paise
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
