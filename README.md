# CogniMuse Marketing Website

A modern, full-featured digital platform for CogniMuse - providing healthcare marketing services, educational content, and event management.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Main Features](#main-features)
- [Documentation](#documentation)
- [Support](#support)

---

## 🌟 Overview

CogniMuse Marketing is a comprehensive web application that combines:

- **Marketing Website**: Showcase healthcare marketing services
- **Knowledge Hub**: Educational content including podcasts and articles
- **Event Management**: Create, manage, and book events with integrated payments
- **Admin Dashboard**: Manage all content and bookings from one place

Built with modern web technologies to ensure fast performance, excellent user experience, and easy maintenance.

---

## ✨ Key Features

### For Visitors

- 🏠 **Professional Marketing Website**: Showcasing services for healthcare professionals
- 📚 **Knowledge Hub**: Browse educational articles and podcast episodes
- 📅 **Event Booking**: Register for events with secure payment processing
- 💳 **Payment Integration**: Seamless payment experience through Razorpay
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- ♿ **Accessible**: Built with accessibility standards in mind

### For Administrators

- 🔐 **Secure Admin Dashboard**: Protected login system
- 📊 **Analytics Overview**: View statistics for events, bookings, and revenue
- 🎫 **Event Management**: Create, edit, and manage events
- 👥 **Booking Management**: View and manage all event registrations
- 💰 **Payment Tracking**: Monitor payment status and transactions

---

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router for modern web applications
- **TypeScript** - Type-safe code for better reliability
- **Tailwind CSS** - Utility-first styling for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible, unstyled UI components

### Backend & Services

- **Firebase** - Database and file storage
  - Firestore - NoSQL database for events and bookings
  - Storage - Media file storage
- **Razorpay** - Payment processing for event bookings
- **Next.js API Routes** - Serverless API endpoints

### Additional Libraries

- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **date-fns** - Date formatting and manipulation
- **Lucide React** - Beautiful, consistent icons

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- A **Firebase account** (free tier works fine)
- A **Razorpay account** (for payment features)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cognimuse-marketing-V2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your credentials (see [Environment Setup](#environment-setup))

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## 📁 Project Structure

```
cognimuse-marketing-V2/
│
├── app/                          # Next.js app directory (pages & API routes)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & typography
│   │
│   ├── about-us/                # About page
│   ├── contact-us/              # Contact page
│   ├── events/                  # Events listing & details
│   ├── knowledge-hub/           # Educational content hub
│   │   ├── articles/            # Article pages
│   │   ├── episode/             # Podcast episode pages
│   │   └── voices/              # Outreach program page
│   │
│   ├── book/                    # Event booking flow
│   │   └── [id]/               # Dynamic booking pages
│   │
│   ├── admin/                   # Admin dashboard
│   │   ├── login/              # Admin authentication
│   │   └── events/             # Event management
│   │
│   └── api/                     # API routes
│       ├── payments/            # Payment processing
│       └── admin/               # Admin operations
│
├── components/                   # Reusable React components
│   ├── Header.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Homepage hero
│   ├── EventCard.tsx            # Event display card
│   ├── EpisodeCard.tsx          # Podcast episode card
│   └── ui/                      # UI component library
│
├── lib/                         # Utility functions & configurations
│   ├── firebase/                # Firebase setup & queries
│   │   ├── config.ts           # Firebase initialization
│   │   ├── db-queries.ts       # Database operations
│   │   └── storage.ts          # File storage operations
│   ├── auth/                    # Authentication utilities
│   └── validation.ts            # Form validation schemas
│
├── data/                        # Static data files
│   ├── events.ts               # Event data
│   └── outreach/               # Content for knowledge hub
│       ├── episodes.json       # Podcast episodes
│       └── articles.json       # Articles
│
├── public/                      # Static assets (images, icons, videos)
│
└── Documentation files          # Setup guides and references

```

---

## ⚙️ Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory with these variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### Getting Your Credentials

#### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your project
4. Copy the configuration values to your `.env.local`
5. Enable Firestore Database
6. Deploy Firestore security rules (see `FIRESTORE_SETUP.md`)

#### Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Navigate to Settings → API Keys
3. Generate or copy your test/live keys
4. Add them to `.env.local`

> **Note**: Use test keys during development. Switch to live keys only for production.

---

## 🎯 Main Features

### 1. Marketing Website

- Homepage with service showcase
- Service packages section
- Client testimonials
- About us page
- Contact page
- Policy pages (Privacy, Terms, Refund)

### 2. Knowledge Hub

Content platform featuring:

- **Podcast Episodes**: Educational episodes with summaries
- **Articles**: In-depth articles on occupational therapy
- **Voices Program**: Outreach initiatives
- Dynamic routing for individual content pieces
- Table of contents for articles

### 3. Event Management System

#### For Attendees

- Browse upcoming events
- View event details (date, time, location, agenda)
- Register for events
- Secure payment processing
- Booking confirmation with meeting links
- Email confirmation (when configured)

#### For Administrators

- Create new events with:
  - Title, description, and agenda
  - Date and time with timezone support
  - Online or offline location
  - Ticket pricing (including free events)
  - Capacity limits
  - Custom registration questions
- Edit existing events
- View all bookings
- Track payments
- Delete events
- Monitor analytics

### 4. Payment Integration

- Razorpay payment gateway
- Support for multiple payment methods:
  - Credit/Debit cards
  - UPI
  - Net banking
  - Wallets
- Dynamic pricing per event
- Payment verification
- Transaction tracking
- Free event support (no payment required)

### 5. Admin Dashboard

- **Authentication**: Secure login system
  - Username: `admin`
  - Password: `admin@cognimuse`
  - 8-hour session timeout
- **Overview Tab**: Key metrics at a glance
- **Events Tab**: Manage all events
- **Bookings Tab**: View and manage registrations
- **Responsive Design**: Works on all devices

---

## 📖 Documentation

Detailed documentation is available in the following files:

- **`TECHNICAL_DOCUMENTATION.md`** - Complete technical reference
- **`SETUP_INSTRUCTIONS.md`** - Detailed setup guide
- **`ADMIN_AUTHENTICATION.md`** - Admin login and security
- **`RAZORPAY_SETUP_GUIDE.md`** - Payment integration guide
- **`FIRESTORE_SETUP.md`** - Database configuration
- **`PAYMENT_VERIFICATION.md`** - Payment flow details
- **`IMPLEMENTATION_SUMMARY.md`** - Feature implementation overview

---

## 🎨 Design System

### Colors

- **Primary**: `#155DFC` (Vibrant blue)
- **Background**: `#FAFAFA` (Off-white)
- **Text**: `#1E1E1E` (Near black)

### Typography

Custom responsive system with Anonymous Pro font:

- Headings: H1, H2, H3 (Bold)
- Paragraphs: P1, P2 (Regular)
- Buttons: Button 1, Button 2 (Bold)
- Footnote: Small text (Regular)

### Responsive Breakpoints

- **Mobile**: 375px+ (default)
- **Tablet**: 744px+
- **Desktop**: 1440px+
- **Large Desktop**: 1728px+

---

## 🔒 Security

- Client-side authentication for admin dashboard
- Session management with automatic timeout
- Firestore security rules for database protection
- Environment variables for sensitive credentials
- Payment signature verification
- HTTPS required for production

> **Production Note**: For production deployment, consider implementing server-side authentication and JWT tokens.

---

## 🚢 Deployment

### Recommended Platforms

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Firebase Hosting**

### Pre-Deployment Checklist

- [ ] Switch Razorpay keys from test to live mode
- [ ] Update environment variables in hosting platform
- [ ] Deploy Firestore security rules
- [ ] Test payment flow end-to-end
- [ ] Verify admin authentication works
- [ ] Check all pages load correctly
- [ ] Test on mobile devices

---

## 🛟 Support

For issues or questions:

1. Check the documentation files in the project
2. Review the code comments
3. Contact the development team

---

## 📝 License

Copyright © 2024-2026 CogniMuse Marketing Services. All rights reserved.

---

**Built with ❤️ using Next.js, Firebase, and modern web technologies.**
