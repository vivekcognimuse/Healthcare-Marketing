# Firestore Security Rules Setup

## Overview

This document explains how to set up Firestore security rules to fix permission errors.

## Current Issues

You're seeing errors like:
```
Error logging to Firestore: FirebaseError: Missing or insufficient permissions.
```

This happens because Firestore security rules need to be configured.

## Setup Instructions

### 1. Open Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**

### 2. Copy Security Rules

Copy and paste the following rules:

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
      allow read: if false; // Admin only (via API routes)
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

### 3. Publish Rules

1. Click **Publish** button
2. Rules will be active immediately

## Rule Explanations

### Events Collection
- **Read**: Public (anyone can view events)
- **Write**: Disabled (only via admin API routes)

### Bookings Collection
- **Read**: Disabled (only via admin API routes)
- **Create**: Public (users can create bookings)
- **Update**: Disabled (only via payment verification API)
- **Delete**: Disabled (admin only)

### Error Logs Collection
- **Read**: Disabled (admin only)
- **Write**: Enabled (allows error logging from client)

## Alternative: Deploy Rules via CLI

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## Testing Rules

After deploying, test your rules:

1. Try creating a booking - should work ✅
2. Try reading events - should work ✅
3. Try reading bookings directly - should fail ❌ (as expected)
4. Error logs should write successfully ✅

## Production Considerations

For production, consider:

1. **More Restrictive Rules**: Add authentication checks
2. **Rate Limiting**: Prevent abuse
3. **Field Validation**: Ensure data integrity
4. **Admin Authentication**: Use Firebase Auth for admin access

Example with authentication:

```javascript
match /bookings/{bookingId} {
  allow create: if request.auth == null && 
                   request.resource.data.keys().hasAll(['eventId', 'name', 'phone']) &&
                   request.resource.data.phone is string &&
                   request.resource.data.phone.size() == 10;
  allow read, update, delete: if request.auth != null && 
                                 request.auth.token.admin == true;
}
```

## Troubleshooting

### Still Getting Permission Errors?

1. **Check Rules**: Make sure rules are published
2. **Check Collection Names**: Ensure they match exactly (case-sensitive)
3. **Clear Cache**: Hard refresh browser (Ctrl+Shift+R)
4. **Check Firebase Config**: Verify environment variables are correct

### Rules Not Updating?

1. Wait a few seconds (rules can take time to propagate)
2. Clear browser cache
3. Try incognito mode
4. Check Firebase Console for rule syntax errors

---

**Note**: The `cz-shortcut-listen` warning is from a browser extension (likely ColorZilla) and is harmless. It can be ignored.
