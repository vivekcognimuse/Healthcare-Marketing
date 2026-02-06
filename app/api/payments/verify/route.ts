import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateBookingPayment, getBooking, getEvent } from "@/lib/firebase/db-queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(text)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get booking details
    const bookingResult = await getBooking(bookingId);
    if (!bookingResult.success || !bookingResult.data) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Get event to get ticket price
    const eventResult = await getEvent(bookingResult.data.eventId);
    const ticketPrice = eventResult.success && eventResult.data ? eventResult.data.ticketPrice : 0;

    // Update booking with payment success
    const updateResult = await updateBookingPayment(bookingId, {
      status: "success",
      transactionId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: ticketPrice,
      currency: "INR",
    });

    if (!updateResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to update booking" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and booking confirmed",
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
