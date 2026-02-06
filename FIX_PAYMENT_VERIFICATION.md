# Fix: Payment Verification Failed - Permission Error

## 🔍 Problem

Payment succeeds, but verification fails with:
```
"Missing or insufficient permissions" 
Function: updateBookingPayment
```

**Root Cause:** Firestore rules block booking updates, but payment verification API needs to update bookings.

## ✅ Solution

The `firestore.rules` file already allows updates (`allow update: if true`), but **you need to deploy these rules to Firebase**.

## 🚀 Quick Fix - Deploy Rules

### Step 1: Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Select your project

### Step 2: Navigate to Firestore Rules
1. Click **"Firestore Database"** in left sidebar
2. Click **"Rules"** tab

### Step 3: Copy Updated Rules
Copy the entire content from `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events - read only for public, write temporarily allowed (development)
    // ⚠️ WARNING: This allows anyone to write events. For production, implement API routes with server-side auth.
    match /events/{eventId} {
      allow read: if true; // Public read
      allow write: if true; // ⚠️ TEMPORARY: Allows writes (development only - not secure for production!)
    }
    
    // Bookings - read/write for admins, create for public
    match /bookings/{bookingId} {
      allow read: if true; // Allow reads (admin dashboard needs this)
      allow create: if true; // Public can create bookings
      allow update: if true; // ⚠️ TEMPORARY: Allow updates (payment verification needs this)
      allow delete: if false; // Admin only
    }
    
    // Error logs - allow writes for error logging
    match /errorLogs/{logId} {
      allow read: if false; // Admin only
      allow write: if true; // Allow error logging from client
    }
  }
}
```

### Step 4: Paste and Publish
1. **Delete** all existing rules in Firebase Console
2. **Paste** the rules above
3. Click **"Publish"** button
4. Wait 10-30 seconds for propagation

## ✅ After Deploying

1. **Test Payment Again:**
   - Make a test payment
   - Payment verification should succeed ✅
   - Booking should update with payment status ✅

2. **Verify:**
   - Check Firestore → bookings collection
   - Payment status should be "success"
   - No more permission errors ✅

## 📋 What Changed

**Before:**
```javascript
allow update: if false; // ❌ Blocked all updates
```

**After:**
```javascript
allow update: if true; // ✅ Allows updates (payment verification works)
```

## 🔐 Security Note

⚠️ **Current Setup:** Allows anyone to update bookings (for payment verification to work)

**For Production:** Consider:
1. Using Firebase Admin SDK in API routes (bypasses rules)
2. Adding field-level validation in rules
3. Restricting updates to specific fields only

But for now, this allows payment verification to work properly.

---

**Status:** Rules updated in code ✅ - **Needs deployment to Firebase** ⚠️
