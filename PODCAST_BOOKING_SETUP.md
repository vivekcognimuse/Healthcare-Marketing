# Podcast Booking Flow - Setup Guide

## Overview

This document provides a complete guide for the podcast booking flow integrated into the Muse Marketing website. The system allows admins to create events and users to book podcasts through Instagram links.

## Architecture

### Flow Diagram

```
Admin Dashboard (/admin)
    ↓
Create/Edit Events
    ↓
Firebase Firestore (events collection)
    ↓
User clicks Instagram link → /book/[eventId]
    ↓
Fill Registration Form
    ↓
Razorpay Payment (if paid event)
    ↓
Payment Verification
    ↓
Success Page (/book/[eventId]/success)
```

## Database Structure

### Collections

#### 1. **events** Collection
```typescript
{
  id: string; // Auto-generated
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;
  startTime: string; // HH:mm format
  endTime: string;
  timezone: string; // e.g., "GMT+05:30"
  location: string;
  locationType: "online" | "offline";
  ticketPrice: number; // 0 for free events
  currency: string; // "INR"
  capacity: number | null; // null = unlimited
  requireApproval: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

#### 2. **bookings** Collection
```typescript
{
  id: string; // Auto-generated
  eventId: string;
  name: string;
  phone: string; // 10 digits
  place: string;
  profession: string;
  age: number;
  paymentDetails: {
    status: "pending" | "success" | "failed";
    transactionId?: string;
    amount?: number;
    currency?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
  };
  paymentTimestamp?: string;
  createdAt: string;
}
```

#### 3. **errorLogs** Collection
```typescript
{
  functionName: string;
  message: string;
  stack: string;
  info: Record<string, any>;
  timestamp: string;
}
```

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable Firestore Database
4. Copy your Firebase config values to `.env.local`
5. Set up Firestore security rules (see below)

### 3. Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard → Settings → API Keys
3. Copy Key ID and Key Secret to `.env.local`
4. Set up webhook URL (optional, for production): `https://yourdomain.com/api/payments/webhook`

### 4. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events - read only for public, write for admins
    match /events/{eventId} {
      allow read: if true; // Public read
      allow write: if false; // Admin only (use Firebase Auth or Cloud Functions)
    }
    
    // Bookings - read/write for admins, create for public
    match /bookings/{bookingId} {
      allow read: if false; // Admin only
      allow create: if true; // Public can create bookings
      allow update: if false; // Admin only (via Cloud Functions)
    }
    
    // Error logs - admin only
    match /errorLogs/{logId} {
      allow read, write: if false; // Admin only
    }
  }
}
```

**Note:** For production, implement proper authentication. For now, admin dashboard access should be protected separately.

## Usage Guide

### Admin Workflow

1. **Access Admin Dashboard**
   - Navigate to `/admin`
   - View all events, bookings, and revenue stats

2. **Create New Event**
   - Click "Create Event" button
   - Fill in event details:
     - Title, Description
     - Start/End Date & Time
     - Timezone
     - Location (online/offline)
     - Ticket Price (0 for free)
     - Capacity (optional)
     - Approval requirements
   - Click "Create Event"
   - Copy the event ID from the URL or dashboard

3. **Share Booking Link**
   - Format: `https://yourdomain.com/book/[eventId]`
   - Share this link on Instagram posts
   - Example: `https://musemarketing.web.app/book/abc123xyz`

4. **View Bookings & Payments**
   - Go to "Bookings & Payments" tab
   - See all registrations with payment status
   - Filter by event, payment status, etc.

5. **Edit/Delete Events**
   - Click "Edit" on any event
   - Make changes and save
   - Or click "Delete" to remove an event

### User Workflow

1. **Click Instagram Link**
   - User clicks booking link from Instagram post
   - Lands on `/book/[eventId]` page

2. **View Event Details**
   - See event title, date, time, location
   - See ticket price and capacity

3. **Fill Registration Form**
   - Name
   - Phone (10 digits)
   - Place
   - Profession
   - Age

4. **Payment (if paid event)**
   - Click "Book Now"
   - Razorpay payment popup appears
   - Complete payment
   - Automatic verification

5. **Success Page**
   - Redirected to success page
   - See booking confirmation
   - Receive booking details

## API Routes

### `/api/payments/create-order`
- **Method:** POST
- **Body:**
  ```json
  {
    "amount": 10000, // in paise
    "currency": "INR",
    "bookingId": "booking_id",
    "eventId": "event_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "orderId": "order_xyz",
    "amount": 10000,
    "currency": "INR"
  }
  ```

### `/api/payments/verify`
- **Method:** POST
- **Body:**
  ```json
  {
    "razorpay_order_id": "order_xyz",
    "razorpay_payment_id": "pay_xyz",
    "razorpay_signature": "signature",
    "bookingId": "booking_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Payment verified and booking confirmed"
  }
  ```

## File Structure

```
Muse-marketing/
├── app/
│   ├── admin/
│   │   ├── page.tsx                    # Admin dashboard
│   │   └── events/
│   │       ├── create/
│   │       │   └── page.tsx            # Create event page
│   │       └── edit/
│   │           └── [eventId]/
│   │               └── page.tsx        # Edit event page
│   ├── book/
│   │   └── [eventId]/
│   │       ├── page.tsx                # Booking form page
│   │       └── success/
│   │           └── page.tsx            # Success page
│   └── api/
│       └── payments/
│           ├── create-order/
│           │   └── route.ts            # Create Razorpay order
│           └── verify/
│               └── route.ts            # Verify payment
├── components/
│   └── PodcastBookingForm.tsx          # Main booking form component
├── lib/
│   ├── firebase/
│   │   ├── config.ts                   # Firebase configuration
│   │   └── db-queries.ts               # Database functions
│   └── validation.ts                   # Form validation
└── .env.example                        # Environment variables template
```

## Features

### ✅ Implemented

- [x] Event creation/editing/deletion
- [x] Dynamic booking pages per event
- [x] Razorpay payment integration
- [x] Payment verification
- [x] Free event support
- [x] Form validation
- [x] Duplicate phone check per event
- [x] Admin dashboard
- [x] Booking & payment tracking
- [x] Success page with booking details
- [x] Responsive design
- [x] Error logging

### 🔄 Future Enhancements

- [ ] Email notifications (using Nodemailer/Zoho)
- [ ] SMS notifications
- [ ] Event capacity tracking
- [ ] Waitlist functionality
- [ ] Admin authentication
- [ ] Export bookings to CSV
- [ ] Analytics dashboard
- [ ] Recurring events
- [ ] Event reminders

## Testing

### Test Free Event
1. Create event with ticket price = 0
2. Visit `/book/[eventId]`
3. Fill form and submit
4. Should redirect to success page without payment

### Test Paid Event
1. Create event with ticket price > 0
2. Visit `/book/[eventId]`
3. Fill form and submit
4. Razorpay popup should appear
5. Use test card: `4111 1111 1111 1111`
6. Complete payment
7. Should redirect to success page

### Test Validation
1. Try submitting empty form
2. Try invalid phone number
3. Try duplicate phone for same event
4. All should show appropriate errors

## Troubleshooting

### Payment Not Working
- Check Razorpay keys in `.env.local`
- Verify Razorpay account is activated
- Check browser console for errors
- Ensure API routes are accessible

### Events Not Loading
- Check Firebase config in `.env.local`
- Verify Firestore is enabled
- Check browser console for errors
- Ensure security rules allow reads

### Booking Not Saving
- Check Firebase config
- Verify Firestore permissions
- Check browser console
- Review error logs in Firestore

## Support

For issues or questions:
1. Check browser console for errors
2. Check Firestore errorLogs collection
3. Verify environment variables
4. Test API routes directly

## Security Notes

⚠️ **Important:** 
- Never commit `.env.local` to git
- Use Firebase Auth for admin access in production
- Implement rate limiting for API routes
- Add CSRF protection
- Validate all inputs server-side
- Use HTTPS in production

## Deployment

1. Set environment variables in hosting platform
2. Build: `npm run build`
3. Deploy to Firebase Hosting or Vercel
4. Configure Razorpay webhook (production)
5. Test end-to-end flow

---

**Last Updated:** February 5, 2026
