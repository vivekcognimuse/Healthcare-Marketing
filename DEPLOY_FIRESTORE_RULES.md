# Deploy Firestore Rules - Step by Step Guide

## ⚠️ Current Issue

The error log shows `getAllBookings` is failing because the updated Firestore rules haven't been deployed to Firebase yet.

## ✅ Solution: Deploy Rules to Firebase

### Method 1: Firebase Console (Recommended - Easiest)

#### Step 1: Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Select your project (the one matching your `.env.local` Firebase config)

#### Step 2: Navigate to Firestore Rules
1. In the left sidebar, click **"Firestore Database"**
2. Click the **"Rules"** tab at the top

#### Step 3: Copy Rules from Your Project
Open `firestore.rules` file in your project and copy **ALL** the content:

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

#### Step 4: Paste and Publish
1. **Delete** all existing rules in the Firebase Console editor
2. **Paste** the rules above
3. Click **"Publish"** button (top right)
4. Confirm if prompted

#### Step 5: Verify
- You should see a success message: "Rules published successfully"
- The rules are now active!

---

### Method 2: Firebase CLI (Alternative)

If you have Firebase CLI installed:

```bash
# Navigate to project directory
cd d:\MuseProjects\Muse-marketing

# Login to Firebase (if not already logged in)
firebase login

# Deploy only Firestore rules
firebase deploy --only firestore:rules
```

---

## 🔍 Verify Rules Are Active

After deploying:

1. **Wait 10-30 seconds** (rules can take a moment to propagate)

2. **Refresh Admin Dashboard**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or close and reopen the browser tab

3. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab
   - Permission errors should be gone ✅

4. **Test Admin Dashboard**
   - Go to `/admin`
   - Bookings should load without errors ✅

---

## 📋 What These Rules Do

### ✅ Events Collection
- **Read**: Anyone can view events (public)
- **Write**: Blocked (admin creates via API routes)

### ✅ Bookings Collection  
- **Read**: Allowed (admin dashboard needs this)
- **Create**: Allowed (users can book events)
- **Update**: Blocked (only payment API can update)
- **Delete**: Blocked (admin only)

### ✅ Error Logs Collection
- **Read**: Blocked (admin only)
- **Write**: Allowed (for error logging)

---

## 🚨 Still Getting Errors?

### Check 1: Rules Are Published
- Go to Firebase Console → Firestore → Rules
- Verify the rules match what's in `firestore.rules`
- Check the "Last published" timestamp

### Check 2: Collection Names Match
Firestore is **case-sensitive**. Ensure collections are exactly:
- `bookings` ✅ (lowercase)
- `events` ✅ (lowercase)
- `errorLogs` ✅ (camelCase)

### Check 3: Clear Cache
- Hard refresh browser: `Ctrl + Shift + R`
- Or try incognito/private window
- Clear browser cache completely

### Check 4: Wait for Propagation
- Rules can take 10-30 seconds to propagate globally
- Wait a minute and try again

### Check 5: Firebase Project
- Verify you're deploying to the **correct Firebase project**
- Check `.env.local` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Make sure it matches the Firebase Console project

---

## 📝 Quick Checklist

- [ ] Opened Firebase Console
- [ ] Navigated to Firestore → Rules
- [ ] Copied rules from `firestore.rules`
- [ ] Pasted rules in Firebase Console
- [ ] Clicked "Publish"
- [ ] Waited 10-30 seconds
- [ ] Refreshed admin dashboard
- [ ] Checked browser console (no errors)
- [ ] Bookings load successfully ✅

---

## 🎯 Expected Result

After deploying rules:
- ✅ Admin dashboard loads bookings
- ✅ No permission errors in console
- ✅ Users can create bookings
- ✅ Events are readable by public
- ✅ Error logs can be written

---

**Need Help?** If errors persist after deploying, check:
1. Firebase Console → Firestore → Rules (verify rules are published)
2. Browser console for specific error messages
3. Network tab to see Firestore requests

---

**Last Updated:** February 5, 2026
