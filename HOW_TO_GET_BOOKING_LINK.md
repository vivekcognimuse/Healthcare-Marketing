# How to Get Podcast Registration/Booking Link

## 📍 Where to Find Booking Links

### Method 1: Admin Dashboard (Easiest)

1. **Login to Admin Dashboard**
   - Go to: `https://musemarketing.web.app/admin`
   - Login with credentials:
     - Username: `admin`
     - Password: `admin@cognimuse`

2. **Find Your Event**
   - Click on **"Events"** tab (default view)
   - Find the event you want to share

3. **Copy Booking Link**
   - Click the **"Copy Link"** button next to your event
   - Link is automatically copied to clipboard!
   - Button shows "Copied!" for 2 seconds

4. **Share the Link**
   - Paste the link in Instagram posts, messages, emails, etc.
   - Format: `https://musemarketing.web.app/book/[eventId]`

### Method 2: Manual Construction

If you know the event ID:

**Format:**
```
https://musemarketing.web.app/book/[eventId]
```

**Example:**
```
https://musemarketing.web.app/book/abc123xyz
```

**To find Event ID:**
- Go to Admin Dashboard → Events tab
- Event ID is shown in the URL when you click "Edit"
- Or check the browser console/network tab

### Method 3: View Button

1. Go to Admin Dashboard → Events tab
2. Click **"View"** button next to your event
3. Copy the URL from browser address bar
4. This is your booking link!

---

## 🎯 Booking Link Format

**Base URL:** `https://musemarketing.web.app`

**Booking Page:** `/book/[eventId]`

**Full Link:** `https://musemarketing.web.app/book/[eventId]`

**Success Page (after booking):** `https://musemarketing.web.app/book/[eventId]/success`

---

## 📱 How to Use Booking Links

### For Instagram Posts:

1. **Create Event** in admin dashboard
2. **Copy Booking Link** using "Copy Link" button
3. **Create Instagram Post** with event details
4. **Add Link** in bio or use Instagram Link Sticker
5. **Share Post** - users click link → fill form → book event

### Example Instagram Post:

```
🎙️ Join our Podcast Session!

📅 Date: [Date]
⏰ Time: [Time]
💰 Price: ₹[Amount] or Free

👉 Book now: [Paste booking link here]

#Podcast #Healthcare #Marketing
```

---

## ✅ Features Added

### Copy Link Button:
- ✅ One-click copy to clipboard
- ✅ Visual feedback ("Copied!" message)
- ✅ Works on all devices
- ✅ Automatically includes full URL

### View Button:
- ✅ Opens booking page in new tab
- ✅ Preview how users will see it
- ✅ Can copy URL from address bar

---

## 🔍 Quick Reference

| Action | Location | Button |
|--------|----------|--------|
| **Copy Link** | Admin Dashboard → Events → Copy Link | ✅ New! |
| **View Page** | Admin Dashboard → Events → View | ✅ |
| **Edit Event** | Admin Dashboard → Events → Edit | ✅ |
| **Delete Event** | Admin Dashboard → Events → Delete | ✅ |

---

## 📝 Notes

- **Booking links work immediately** after creating an event
- **Links are permanent** - they don't expire
- **Event must be active** (`isActive: true`) for bookings to work
- **Free events** (`ticketPrice: 0`) bypass payment
- **Paid events** require Razorpay payment

---

## 🚀 Next Steps After Getting Link

1. ✅ Copy booking link
2. ✅ Test the link (click "View" button)
3. ✅ Share on Instagram, WhatsApp, email, etc.
4. ✅ Monitor bookings in Admin Dashboard → Bookings tab

---

**Last Updated:** February 5, 2026
