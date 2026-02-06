# Podcast Booking Flow - Quick Start

## What's Been Implemented

✅ Complete podcast booking system with:
- Admin dashboard for event management
- Dynamic booking pages (`/book/[eventId]`)
- Razorpay payment integration
- Free and paid event support
- Booking tracking and analytics

## Quick Setup

1. **Install dependencies** (already done)
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in Firebase and Razorpay credentials

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access admin dashboard**
   - Go to `http://localhost:3000/admin`
   - Create your first event

5. **Test booking flow**
   - Copy event ID from admin dashboard
   - Visit `http://localhost:3000/book/[eventId]`
   - Fill form and test payment

## Key URLs

- **Admin Dashboard:** `/admin`
- **Create Event:** `/admin/events/create`
- **Edit Event:** `/admin/events/edit/[eventId]`
- **Booking Page:** `/book/[eventId]`
- **Success Page:** `/book/[eventId]/success`

## Instagram Integration

Share booking links in Instagram posts:
```
https://yourdomain.com/book/[eventId]
```

Users click → Fill form → Pay (if paid) → Confirmed!

## Documentation

See `PODCAST_BOOKING_SETUP.md` for complete documentation.
