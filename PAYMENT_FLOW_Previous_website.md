# Complete Payment Flow Documentation - AI Course Website

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Payment Flow Diagram](#payment-flow-diagram)
4. [Firebase Configuration](#firebase-configuration)
5. [Database Structure](#database-structure)
6. [Form Components](#form-components)
7. [Payment Integration](#payment-integration)
8. [Database Functions](#database-functions)
9. [Payment Success Flow](#payment-success-flow)
10. [Email Notifications](#email-notifications)
11. [Implementation Guide for Podcast Registration](#implementation-guide-for-podcast-registration)

---

## Overview

This documentation provides a complete reference for the payment and registration flow implemented in the AI Course website. The system handles:

- User registration with form validation
- Razorpay payment integration
- Firebase Firestore database operations
- Referral system tracking
- Email confirmations
- Success page with transaction details

**Goal:** Use this as a reference to implement a similar flow for podcast registration with a simpler form (name, phone, place, profession, age) + payment.

---

## Technology Stack

```json
{
  "framework": "Next.js 14",
  "ui": "React 18 + TailwindCSS",
  "database": "Firebase Firestore",
  "payment": "Razorpay",
  "validation": "Custom React Hooks",
  "email": "Nodemailer (Zoho)",
  "dependencies": {
    "firebase": "^11.0.1",
    "nodemailer": "^6.9.16",
    "framer-motion": "^11.11.11"
  }
}
```

---

## Payment Flow Diagram

```
User Lands on Page
       ↓
Clicks "Enroll Now" CTA
       ↓
[Razorpay Payment Button]
       ↓
Payment Processing
       ↓
Payment Callback/Redirect
       ↓
Update Database (Firestore)
       ↓
Send Email Confirmation
       ↓
Redirect to Success Page
       ↓
Display Transaction Details
```

---

## Firebase Configuration

### File: `src/firebase/index.js`

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

**Environment Variables Required:**

- Firebase credentials (stored in Firebase config)
- `ZOHO_EMAIL` - Email sender address
- `ZOHO_APP_PASSWORD` - Email password

---

## Database Structure

### Firestore Collections

#### 1. **students** Collection

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  whatsapp: "9876543210",
  profession: "Student", // or "Employee"
  college: "ABC University", // if Student
  year: "3", // if Student
  branch: "Computer Science", // if Student
  referredBy: "ref123", // optional
  referralID: "joh456", // generated for user
  totalReferrals: 0,
  referralsDetails: [],
  paymentDetails: {
    status: "success",
    transactionId: "doc_id-timestamp"
  },
  paymentTimestamp: "2026-02-05T10:30:00.000Z",
  createdAt: "2026-02-05T10:25:00.000Z"
}
```

#### 2. **referrers** Collection

```javascript
{
  name: "Jane Smith",
  email: "jane@example.com",
  whatsapp: "9876543210",
  profession: "Employee",
  upi: "jane@paytm",
  referralID: "jan789",
  totalReferrals: 5,
  referralsDetails: [
    {
      name: "Referred User",
      email: "referred@example.com",
      timestamp: "2026-02-05T11:00:00.000Z"
    }
  ]
}
```

#### 3. **errorLogs** Collection

```javascript
{
  functionName: "checkEmailExists",
  message: "Error message",
  stack: "Error stack trace",
  info: { email: "test@example.com" },
  timestamp: "2026-02-05T10:30:00.000Z"
}
```

---

## Form Components

### 1. Form Validation Hook - `src/hooks/use-Validation.jsx`

```javascript
import { useState } from "react";

const useFormValidation = (formData, mode) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^[^a-zA-Z]/.test(formData.name.trim())) {
      newErrors.name =
        "Name should not start with a number or special character";
      formIsValid = false;
    }

    // Validate WhatsApp number
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
      formIsValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.whatsapp)) {
      newErrors.whatsapp =
        "WhatsApp number should be 10 digits and start with 6, 7, 8, or 9";
      formIsValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
      formIsValid = false;
    }

    // Validate profession
    if (!formData.profession) {
      newErrors.profession = "Profession is required";
      formIsValid = false;
    }

    // Student-specific validations
    if (formData.profession === "Student") {
      if (!formData.college.trim()) {
        newErrors.college = "College is required";
        formIsValid = false;
      }
      if (!formData.year) {
        newErrors.year = "Year is required";
        formIsValid = false;
      }
      if (!formData.branch.trim()) {
        newErrors.branch = "Branch is required";
        formIsValid = false;
      }
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return { errors, validateForm };
};

export default useFormValidation;
```

### 2. Referral ID Generation - `src/lib/generateRefferalID.js`

```javascript
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function generateReferralID(name) {
  const baseID = name.slice(0, 3).toLowerCase();
  let uniqueID;
  let idExists = true;

  while (idExists) {
    const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    uniqueID = `${baseID}${randomNum}`;

    // Check both collections for uniqueness
    const referrersQuery = query(
      collection(db, "referrers"),
      where("referralID", "==", uniqueID),
    );
    const studentsQuery = query(
      collection(db, "students"),
      where("referralID", "==", uniqueID),
    );

    const referrersSnapshot = await getDocs(referrersQuery);
    const studentsSnapshot = await getDocs(studentsQuery);

    idExists = !referrersSnapshot.empty || !studentsSnapshot.empty;
  }

  return uniqueID;
}
```

---

## Payment Integration

### 1. Razorpay Payment Button - `src/component/ui/Button1.jsx`

This is the main CTA that triggers the payment flow:

```jsx
"use client";
import React, { useEffect } from "react";

const CTA = () => {
  useEffect(() => {
    if (
      !document.querySelector(
        'script[data-payment_button_id="pl_PKp9FhTVzsLQDo"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_PKp9FhTVzsLQDo");
      script.async = true;
      document.getElementById("razorpay-container").appendChild(script);
    }
  }, []);

  return (
    <div className="p-2">
      <form id="razorpay-container">
        {/* Razorpay payment button will be rendered here by the script */}
      </form>
    </div>
  );
};

export default CTA;
```

**Key Points:**

- Uses Razorpay's Payment Button feature
- `data-payment_button_id` is your Razorpay button ID (get from Razorpay Dashboard)
- Script auto-loads the payment interface
- No custom form needed - Razorpay handles everything

### 2. Razorpay Hook (Alternative Method) - `src/hooks/use-razorpay.jsx`

```jsx
import { useEffect } from "react";

const useRazorpay = (onSuccess, onFailure) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = (options) => {
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", onFailure);
  };

  return initiatePayment;
};

export default useRazorpay;
```

---

## Database Functions

### File: `src/functions/db-queries.js`

**Note:** Payment status verification is handled directly by Razorpay's payment callback mechanism.

```javascript
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/index";

// Error logging to Firestore
const logError = async (functionName, error, additionalInfo = {}) => {
  const errorData = {
    functionName,
    message: error.message,
    stack: error.stack,
    info: additionalInfo,
    timestamp: new Date().toISOString(),
  };
  try {
    await addDoc(collection(db, "errorLogs"), errorData);
  } catch (firestoreError) {
    console.error("Error logging to Firestore:", firestoreError);
    console.error("Original error:", errorData);
  }
};

// 1. Check if email exists
export const checkEmailExists = async (email, collectionName) => {
  try {
    const emailQuery = query(
      collection(db, collectionName),
      where("email", "==", email),
    );
    const snapshot = await getDocs(emailQuery);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const paymentStatus = doc.data().paymentDetails?.status || null;

      return {
        exists: true,
        paymentStatus: paymentStatus,
        docId: doc.id,
      };
    } else {
      return {
        exists: false,
        paymentStatus: null,
        docId: null,
      };
    }
  } catch (error) {
    await logError("checkEmailExists", error, { email, collectionName });
    return { exists: false, paymentStatus: null, docId: null };
  }
};

// 2. Create user document
export const createUserData = async (collectionName, data) => {
  try {
    const result = await addDoc(collection(db, collectionName), data);
    return result;
  } catch (error) {
    await logError("createUserData", error, { collectionName, data });
    return null;
  }
};

// 3. Check if referral ID exists
export const checkReferralIdExists = async (referralID) => {
  try {
    const referrerQuery = query(
      collection(db, "referrers"),
      where("referralID", "==", referralID),
    );
    const referrerSnapshot = await getDocs(referrerQuery);

    return !referrerSnapshot.empty;
  } catch (error) {
    await logError("checkReferralIdExists", error, { referralID });
    return false;
  }
};

// 4. Increment referrer count
export const incrementReferrerCount = async (
  referralID,
  newReferralDetails,
) => {
  try {
    // Check "referrers" collection
    const referrerQuery = query(
      collection(db, "referrers"),
      where("referralID", "==", referralID),
    );
    const referrerSnapshot = await getDocs(referrerQuery);

    let referrerUpdateSuccess = false;
    let updatedTotalReferrals = 0;

    if (!referrerSnapshot.empty) {
      const referrerDoc = referrerSnapshot.docs[0];
      const referrerRef = doc(db, "referrers", referrerDoc.id);
      updatedTotalReferrals = (referrerDoc.data().totalReferrals || 0) + 1;

      await updateDoc(referrerRef, {
        totalReferrals: updatedTotalReferrals,
        referralsDetails: arrayUnion(newReferralDetails),
      });

      referrerUpdateSuccess = true;
    }

    // Check "students" collection
    const studentQuery = query(
      collection(db, "students"),
      where("referralID", "==", referralID),
    );
    const studentSnapshot = await getDocs(studentQuery);

    let studentUpdateSuccess = false;

    if (!studentSnapshot.empty) {
      const studentDoc = studentSnapshot.docs[0];
      const studentRef = doc(db, "students", studentDoc.id);
      const updatedStudentTotalReferrals =
        (studentDoc.data().totalReferrals || 0) + 1;

      await updateDoc(studentRef, {
        totalReferrals: updatedStudentTotalReferrals,
        referralsDetails: arrayUnion(newReferralDetails),
      });

      studentUpdateSuccess = true;
    }

    const success = referrerUpdateSuccess || studentUpdateSuccess;
    return {
      success,
      totalReferrals: success ? updatedTotalReferrals : 0,
      referrerUpdateSuccess,
      studentUpdateSuccess,
    };
  } catch (error) {
    await logError("incrementReferrerCount", error, {
      referralID,
      newReferralDetails,
    });
    return { success: false, error: error.message };
  }
};

// 5. Update payment details
export const updatePaymentDetails = async (
  documentId,
  paymentDetails,
  collectionName = "students",
) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const updatedData = {
      paymentDetails,
      paymentTimestamp: new Date().toISOString(),
    };
    await updateDoc(docRef, updatedData);
    return true;
  } catch (error) {
    await logError("updatePaymentDetails", error, {
      documentId,
      paymentDetails,
    });
    return false;
  }
};

// 6. Update payment info with referral ID
export const updatePaymentInfo = async (
  documentId,
  paymentInfo,
  referralID,
) => {
  try {
    const docRef = doc(db, "students", documentId);
    await updateDoc(docRef, {
      paymentDetails: paymentInfo,
      paymentTimestamp: new Date().toISOString(),
      referralID,
    });
    return true;
  } catch (error) {
    await logError("updatePaymentInfo", error, { documentId, paymentInfo });
    return false;
  }
};

// 7. Get student referral info
export const getStudentReferralInfo = async (documentId) => {
  try {
    const studentDocRef = doc(db, "students", documentId);
    const studentDocSnapshot = await getDoc(studentDocRef);

    if (studentDocSnapshot.exists()) {
      const studentData = studentDocSnapshot.data();
      return {
        referredBy: studentData.referredBy || null,
        email: studentData.email || null,
        name: studentData.name || null,
      };
    } else {
      return { referredBy: null, email: null, name: null };
    }
  } catch (error) {
    await logError("getStudentReferralInfo", error, { documentId });
    return { referredBy: null, email: null, name: null };
  }
};
```

---

## Payment Success Flow

### Success Page - `src/app/success/page.js`

```javascript
"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponent />
    </Suspense>
  );
}

const PaymentComponent = () => {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const referralId = searchParams.get("referralId");
  const referralUpdateSuccess = searchParams.get("referralUpdateSuccess");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <CheckCircle className="w-12 h-12 text-neon" />
            <h1 className="mt-4 text-3xl font-bold text-white">
              Payment Successful!
            </h1>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Transaction Details
              </h2>
              <div className="flex justify-between items-center border-b border-gray-800 py-3">
                <span className="text-gray-400">Transaction ID</span>
                <span className="text-neon font-mono">{transactionId}</span>
              </div>
              {referralId && (
                <div className="flex justify-between items-center border-b border-gray-800 py-3">
                  <span className="text-gray-400">Referral ID</span>
                  <span className="text-neon font-mono">{referralId}</span>
                </div>
              )}
              {referralUpdateSuccess && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Referral Status</span>
                  <span className="text-green-400 font-mono">Success</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              className="inline-flex items-center px-6 py-3 bg-green-400 text-black font-semibold
                         rounded-lg hover:bg-green-300 transition-colors duration-200 gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**Success Page URL Format:**

```
/success?transactionId=DOC123-1234567890&referralId=joh456&referralUpdateSuccess=true
```

---

## Email Notifications

### File: `src/utils/send-email.js`

```javascript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

export async function sendPaymentSuccessEmail(
  toEmail,
  userName,
  paymentDetails,
) {
  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: toEmail,
    subject: "Payment Successful",
    text: `Hello ${userName},\n\nThank you for your payment. Here are the details:\n\n${JSON.stringify(
      paymentDetails,
      null,
      2,
    )}\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Success email sent to", toEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
```

---

## Implementation Guide for Podcast Registration

### Simplified Form Structure

For podcast registration, create a simpler form with these fields:

```javascript
const podcastFormData = {
  name: "",
  phone: "",
  place: "",
  profession: "",
  age: "",
};
```

### Step-by-Step Implementation

#### 1. **Setup Firebase**

- Create a Firebase project
- Copy configuration from `src/firebase/index.js`
- Create a `podcast_registrations` collection

#### 2. **Create Razorpay Payment Button**

- Login to Razorpay Dashboard
- Create a Payment Button
- Copy the button ID
- Use the `Button1.jsx` component pattern

#### 3. **Database Schema**

```javascript
// Firestore: podcast_registrations collection
{
  name: "John Doe",
  phone: "9876543210",
  place: "Mumbai",
  profession: "Software Engineer",
  age: "28",
  paymentDetails: {
    status: "success",
    transactionId: "DOC123-1234567890"
  },
  paymentTimestamp: "2026-02-05T10:30:00.000Z",
  createdAt: "2026-02-05T10:25:00.000Z"
}
```

#### 4. **Form Validation**

```javascript
const validatePodcastForm = () => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!formData.place.trim()) {
    errors.place = "Place is required";
  }

  if (!formData.profession.trim()) {
    errors.profession = "Profession is required";
  }

  if (!formData.age || formData.age < 1 || formData.age > 120) {
    errors.age = "Valid age is required";
  }

  return errors;
};
```

#### 5. **Payment Flow Integration**

```jsx
// Podcast Registration Page Component
import { useState } from "react";
import { createUserData } from "@/functions/db-queries";
import CTA from "@/components/ui/Button1"; // Razorpay button

const PodcastRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    profession: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validatePodcastForm();
    if (Object.keys(errors).length > 0) {
      // Show errors
      return;
    }

    // Create database entry BEFORE payment
    const userData = {
      ...formData,
      createdAt: new Date().toISOString(),
      paymentDetails: { status: "pending" },
    };

    const docRef = await createUserData("podcast_registrations", userData);

    if (docRef) {
      // Store doc ID for payment callback
      sessionStorage.setItem("podcastDocId", docRef.id);
      // Razorpay button will handle payment
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="phone" value={formData.phone} onChange={handleChange} />
        <input name="place" value={formData.place} onChange={handleChange} />
        <input
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />

        {/* Razorpay Payment Button */}
        <CTA>Pay & Register</CTA>
      </form>
    </div>
  );
};
```

#### 6. **Payment Callback Handler**

After payment, Razorpay redirects to your callback URL. Handle it:

```javascript
// Razorpay handles payment verification via webhook or callback
// When payment is successful, Razorpay triggers your webhook or redirects to success URL
// Then update your database:

export async function handlePaymentSuccess(req, res) {
  const { transactionId, paymentDetails } = req.body;

  const docId = sessionStorage.getItem("podcastDocId");

  // Update database with successful payment
  await updatePaymentDetails(
    docId,
    {
      status: "success",
      transactionId,
      ...paymentDetails,
    },
    "podcast_registrations",
  );

  // Send email confirmation
  const userData = await getDocumentData(docId);
  await sendPaymentSuccessEmail(userData.email, userData.name, paymentDetails);

  // Redirect to success page
  res.redirect(`/success?transactionId=${transactionId}`);
}
```

---

## Key Differences for Podcast Registration

| Feature         | AI Course (Current)                                      | Podcast (New)                       |
| --------------- | -------------------------------------------------------- | ----------------------------------- |
| Form Fields     | Name, Email, WhatsApp, Profession, College, Year, Branch | Name, Phone, Place, Profession, Age |
| Collections     | students, referrers                                      | podcast_registrations               |
| Referral System | Yes                                                      | Not needed (can be removed)         |
| Payment Gateway | Razorpay                                                 | Razorpay (reuse)                    |
| Email           | Required                                                 | Optional                            |

---

## Environment Variables Checklist

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email (Optional)
ZOHO_EMAIL=
ZOHO_APP_PASSWORD=
```

---

## Quick Start Checklist

- [ ] Setup Firebase project and get credentials
- [ ] Create Firestore collection: `podcast_registrations`
- [ ] Setup Razorpay account and create Payment Button
- [ ] Copy Firebase config file
- [ ] Copy database functions (`db-queries.js`)
- [ ] Create simplified form with 5 fields
- [ ] Integrate Razorpay button
- [ ] Setup payment callback handler
- [ ] Create success page
- [ ] (Optional) Setup email notifications
- [ ] Test end-to-end flow

---

## Testing

1. **Test Payment Flow:**
   - Fill form → Click payment button → Complete payment → Verify database update → Check success page

2. **Test Edge Cases:**
   - Payment failure handling
   - Network errors
   - Duplicate submissions
   - Invalid form data

3. **Verify Database:**
   - Check Firestore console
   - Verify all fields are saved correctly
   - Check payment details structure

---

## Support & References

- **Razorpay Docs:** https://razorpay.com/docs/
- **Firebase Docs:** https://firebase.google.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

_This documentation was generated on February 5, 2026, for the purpose of replicating the payment flow on another website for podcast registrations. Uses Razorpay only for payment processing._
