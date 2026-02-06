# Razorpay Dashboard Setup Guide

## 🎯 Your Use Case

You need:
- ✅ **Dynamic pricing** - Each event can have different ticket prices
- ✅ **Admin-controlled** - Admin sets price when creating event
- ✅ **Custom amounts** - Not fixed amounts
- ✅ **Integration with booking form** - Payment triggered from your website

## ❌ Which Payment Product NOT to Choose

**DO NOT choose "Payment Button"** - This is for **fixed amounts only**. It won't work for your use case because:
- Payment Button requires a fixed amount set in Razorpay dashboard
- You need dynamic amounts (different for each event)
- Admin sets prices in your admin dashboard, not Razorpay dashboard

**Also avoid:**
- ❌ Payment Links (static links with fixed amounts)
- ❌ Payment Pages (custom pages but still fixed amounts)
- ❌ Razorpay.me Link (simple but fixed amounts)
- ❌ Invoices (for invoicing, not booking)

## ✅ Recommended Setup: Razorpay Checkout (Standard Integration)

**You don't need to choose any of those Payment Products!**

Instead, use **Razorpay Checkout SDK** - This is what we've already implemented! It:
- ✅ Supports dynamic amounts (perfect for your use case)
- ✅ Works with your existing code
- ✅ Allows admin to set any price per event
- ✅ Integrates seamlessly with your booking form
- ✅ No need to create products in Razorpay dashboard

## 📋 Razorpay Dashboard Setup Steps

### Step 1: Get Your API Keys (REQUIRED)

1. **Login to Razorpay Dashboard**
   - Go to https://dashboard.razorpay.com/
   - Login with your account

2. **Navigate to Settings → API Keys**
   - Click on **Settings** in the left sidebar
   - Click on **API Keys**

3. **Get Your Keys**
   - You'll see:
     - **Key ID** (starts with `rzp_test_` for test mode or `rzp_live_` for live)
     - **Key Secret** (click "Reveal" to see it)
   - **Copy both keys**

4. **Add to Environment Variables**
   ```env
   # Add these to your .env.local file
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_key_secret_here
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```
   
   **Important:**
   - Use **Test Keys** (`rzp_test_...`) for development
   - Use **Live Keys** (`rzp_live_...`) for production
   - Restart dev server after adding keys

### Step 2: Activate Your Account

1. **Complete KYC** (Required for Live Mode)
   - Go to **Settings** → **Account & Settings**
   - Complete KYC verification
   - Upload required documents
   - Wait for approval (usually 24-48 hours)

2. **Activate Payment Methods**
   - Go to **Settings** → **Payment Methods**
   - Enable payment methods you want:
     - ✅ Cards (Credit/Debit) - Recommended
     - ✅ UPI - Recommended for India
     - ✅ Netbanking
     - ✅ Wallets (Paytm, PhonePe, etc.)
     - ✅ Others as needed

### Step 3: Test Mode vs Live Mode

**For Development (Current):**
- ✅ Use **Test Mode** (toggle in top-right of dashboard)
- ✅ Use **Test API Keys** (`rzp_test_...`)
- ✅ Test with test cards (see below)
- ✅ No KYC required

**For Production:**
- Switch to **Live Mode**
- Use **Live API Keys** (`rzp_live_...`)
- Complete KYC first
- Test thoroughly before going live

### Step 4: Test Cards (Development Only)

Use these test cards in **Test Mode**:

**Success Card:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits (e.g., `123`)
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Failure Card (for testing):**
- Card Number: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

### Step 5: Webhook Setup (Optional but Recommended for Production)

For production, set up webhooks for additional payment verification:

1. **Go to Settings → Webhooks**
2. **Add Webhook**
   - URL: `https://yourdomain.com/api/payments/webhook`
   - Events to listen:
     - `payment.captured`
     - `payment.failed`
     - `order.paid`
3. **Copy Webhook Secret** (add to `.env.local` as `RAZORPAY_WEBHOOK_SECRET`)

**Note:** Webhooks are optional - your current implementation already verifies payments via API.

## 🔧 How Your Current Integration Works

Your code uses **Razorpay Checkout SDK**, which:

### Flow:
```
1. Admin creates event with ticketPrice = ₹500
   ↓
2. User fills booking form
   ↓
3. Frontend: event.ticketPrice * 100 = 50000 paise
   ↓
4. API creates Razorpay order with amount = 50000 paise
   ↓
5. Razorpay Checkout popup opens (shows ₹500)
   ↓
6. User pays ₹500
   ↓
7. Payment verified on server
   ↓
8. Booking updated with success status
   ↓
9. Redirect to success page with meeting link
```

### Key Points:
- ✅ **Dynamic amounts** - Each event can have different price
- ✅ **No fixed products needed** - Amounts come from your database
- ✅ **Server-side verification** - Secure payment handling
- ✅ **Custom integration** - Full control over flow

## ✅ What You Need to Do RIGHT NOW

### Immediate Steps:

1. **Get API Keys**
   - Login to Razorpay Dashboard
   - Go to Settings → API Keys
   - Copy Key ID and Key Secret

2. **Add to `.env.local`**:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_here
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```

3. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

4. **Test**
   - Create event in admin dashboard
   - Book event
   - Use test card: `4111 1111 1111 1111`

## 🧪 Testing Checklist

### Test Different Amounts:
- [ ] Create event with ₹0 → Should show "Free"
- [ ] Create event with ₹100 → Payment should be ₹100
- [ ] Create event with ₹500 → Payment should be ₹500
- [ ] Create event with ₹999 → Payment should be ₹999

### Test Payment Flow:
- [ ] Fill booking form
- [ ] Click "Book Now"
- [ ] Razorpay popup opens
- [ ] Enter test card: `4111 1111 1111 1111`
- [ ] Complete payment
- [ ] Success page shows correct amount
- [ ] Meeting link displays correctly

### Verify in Dashboard:
- [ ] Go to Razorpay Dashboard → Payments
- [ ] See test payment listed
- [ ] Check amount matches event price
- [ ] Verify payment status is "captured"

## 📊 Dashboard Features You Can Use

### View Payments
- **Dashboard → Payments**
- See all transactions
- Filter by date, status, amount
- Download reports

### View Orders
- **Dashboard → Orders**
- See all orders created
- Link orders to bookings via notes

### Analytics
- **Dashboard → Analytics**
- View payment trends
- See success rates
- Monitor revenue

### Settlements
- **Dashboard → Settlements**
- View settlement schedule
- Track payouts

## 🔐 Security Best Practices

1. **Never commit API keys to git**
   - ✅ Already in `.gitignore`
   - Keep in `.env.local` only

2. **Use different keys for test/live**
   - Test keys: `rzp_test_...` (development)
   - Live keys: `rzp_live_...` (production)

3. **Verify payments server-side**
   - ✅ Already implemented in `/api/payments/verify`
   - Never trust client-side payment data

4. **Use HTTPS in production**
   - Required for Razorpay
   - Your hosting should provide SSL

5. **Keep Key Secret secure**
   - Never expose in frontend code
   - Only use in server-side API routes

## 🚨 Common Issues & Solutions

### Issue: "Invalid Key ID"
**Solution:**
- Check `RAZORPAY_KEY_ID` in `.env.local`
- Ensure it starts with `rzp_test_` or `rzp_live_`
- Restart dev server after adding keys
- Check for typos or extra spaces

### Issue: "Payment Failed"
**Solution:**
- Check if account is activated
- Verify payment method is enabled in dashboard
- Check Razorpay dashboard → Payments for error details
- Ensure you're using test cards in test mode

### Issue: "Amount Mismatch"
**Solution:**
- Ensure amount is in paise (multiply by 100)
- Check `event.ticketPrice` is correct
- Verify API route receives correct amount
- Check Razorpay order amount matches

### Issue: "Payment verification failed"
**Solution:**
- Check `RAZORPAY_KEY_SECRET` is correct
- Verify signature generation matches Razorpay's
- Check server logs for detailed error

## 📝 Summary

### ✅ What You Need:
1. **API Keys** from Razorpay Dashboard (Settings → API Keys)
2. **Add to `.env.local`** (3 variables)
3. **Test with test cards**
4. **Complete KYC** (for production)

### ❌ What You DON'T Need:
- ❌ Payment Button (fixed amounts only)
- ❌ Payment Links (static links)
- ❌ Payment Pages (custom pages)
- ❌ Any payment products from dashboard
- ✅ Just API Keys + Checkout SDK (already implemented!)

### 🎯 Your Current Implementation:
- ✅ Uses Razorpay Checkout SDK
- ✅ Supports dynamic amounts
- ✅ Works with admin-set prices
- ✅ Properly verifies payments
- ✅ Just needs API keys to work!

## 🚀 Quick Start

1. **Get Keys:**
   ```
   Dashboard → Settings → API Keys → Copy Key ID & Secret
   ```

2. **Add to `.env.local`:**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_here
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```

3. **Restart & Test:**
   ```bash
   npm run dev
   # Create event → Book → Use test card
   ```

That's it! Your integration is already set up correctly. 🎉

---

**Need Help?**
- Razorpay Docs: https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
- Support: support@razorpay.com
- Dashboard: https://dashboard.razorpay.com/

---

**Last Updated:** February 5, 2026
