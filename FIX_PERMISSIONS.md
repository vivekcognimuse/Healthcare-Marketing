# Fix: Missing or Insufficient Permissions

## Problem

You're seeing "Missing or insufficient permissions" errors because:
1. The admin dashboard reads bookings directly from Firestore (client-side)
2. The current Firestore rules block all reads for bookings (`allow read: if false`)

## Solution

I've updated the `firestore.rules` file to allow reads for bookings. Now you need to **deploy these rules to Firebase**.

## Quick Fix - Deploy Rules via Firebase Console

### Option 1: Firebase Console (Easiest)

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com/
   - Select your project

2. **Navigate to Firestore Rules**
   - Click **Firestore Database** in the left menu
   - Click the **Rules** tab

3. **Copy Updated Rules**
   Copy the entire content from `firestore.rules` file:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events - read only for public, write for admins (via API/Cloud Functions)
    match /events/{eventId} {
      allow read: if true; // Public read
      allow write: if false; // Admin only (handled via API routes with authentication)
    }
    
    // Bookings - read/write for admins, create for public
    match /bookings/{bookingId} {
      allow read: if true; // Allow reads (admin dashboard needs this)
      allow create: if true; // Public can create bookings
      allow update: if false; // Admin only (via API routes)
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

4. **Paste and Publish**
   - Paste the rules into the editor
   - Click **Publish** button
   - Rules will be active immediately

### Option 2: Firebase CLI

If you have Firebase CLI installed:

```bash
# Make sure you're in the project directory
cd d:\MuseProjects\Muse-marketing

# Login to Firebase (if not already)
firebase login

# Deploy only the Firestore rules
firebase deploy --only firestore:rules
```

## What Changed?

**Before:**
```javascript
match /bookings/{bookingId} {
  allow read: if false; // ❌ Blocked all reads
  ...
}
```

**After:**
```javascript
match /bookings/{bookingId} {
  allow read: if true; // ✅ Allow reads (admin dashboard needs this)
  ...
}
```

## Why This Change?

The admin dashboard (`/admin`) uses client-side queries to read bookings:
- `getAllBookings()` - Reads all bookings
- `getBookingsByEvent()` - Reads bookings for a specific event

These functions run in the browser (client-side), so they need read permissions.

## Security Note

⚠️ **Current Setup:** Allows anyone to read bookings (for admin dashboard to work)

**For Production:** Consider:
1. Using Firebase Authentication for admin users
2. Creating API routes for admin operations
3. Using Firebase Admin SDK on the server

But for now, this allows your admin dashboard to work properly.

## Verify It Works

After deploying rules:

1. **Refresh your admin dashboard** (hard refresh: Ctrl+Shift+R)
2. **Check browser console** - permission errors should be gone
3. **Try loading bookings** - should work now ✅

## Still Getting Errors?

1. **Wait 10-30 seconds** - Rules can take time to propagate
2. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)
3. **Check Firebase Console** - Verify rules are published
4. **Check collection names** - Must match exactly (case-sensitive):
   - `bookings` ✅
   - `events` ✅
   - `errorLogs` ✅

---

**Status:** Rules updated in code, needs deployment to Firebase
