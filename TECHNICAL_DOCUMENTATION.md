# CogniMuse Marketing - Technical Documentation

**Version:** 1.0  
**Last Updated:** February 25, 2026  
**Maintained by:** CogniMuse Development Team

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Application Features](#application-features)
6. [Database Structure](#database-structure)
7. [API Reference](#api-reference)
8. [Component Library](#component-library)
9. [Development Workflow](#development-workflow)
10. [Testing Guide](#testing-guide)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)
13. [Best Practices](#best-practices)
14. [Security Considerations](#security-considerations)
15. [Performance Optimization](#performance-optimization)

---

## 1. Introduction

### What is CogniMuse Marketing?

CogniMuse Marketing is a comprehensive digital platform designed to serve three primary purposes:

1. **Marketing Website**: Showcase healthcare marketing services to potential clients
2. **Educational Platform**: Share knowledge through articles and podcast episodes
3. **Event Management System**: Enable event creation, registration, and payment processing

### Who is this documentation for?

This documentation is written for:

- Developers joining the project
- Maintainers updating features
- System administrators deploying the application
- Technical stakeholders understanding the system

### How to use this documentation

- **New developers**: Start with [Getting Started](#getting-started) and [System Architecture](#system-architecture)
- **Feature development**: Review [Component Library](#component-library) and [Development Workflow](#development-workflow)
- **Deployment**: Jump to [Deployment Guide](#deployment-guide)
- **Issues**: Check [Troubleshooting](#troubleshooting)

---

## 2. System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                     (React/Next.js App)                      │
└────────────────┬────────────────────────────┬────────────────┘
                 │                            │
                 │                            │
         ┌───────▼────────┐          ┌────────▼────────┐
         │   Next.js API  │          │   Firebase      │
         │     Routes     │          │   (Firestore)   │
         │  (Serverless)  │          │   Database      │
         └───────┬────────┘          └─────────────────┘
                 │
                 │
         ┌───────▼────────┐
         │   Razorpay     │
         │  Payment API   │
         └────────────────┘
```

### Application Layers

#### 1. Presentation Layer (Frontend)

- **Technology**: Next.js 15 with App Router, React 18, TypeScript
- **Purpose**: User interface and client-side logic
- **Location**: `/app` and `/components` directories

#### 2. API Layer (Backend)

- **Technology**: Next.js API Routes (Serverless functions)
- **Purpose**: Handle business logic, database operations, payment processing
- **Location**: `/app/api` directory

#### 3. Data Layer

- **Technology**: Firebase Firestore (NoSQL database)
- **Purpose**: Store events, bookings, and error logs
- **Management**: Firebase Console

#### 4. Storage Layer

- **Technology**: Firebase Storage
- **Purpose**: Store event images and media files
- **Management**: Firebase Console

#### 5. Payment Layer

- **Technology**: Razorpay Payment Gateway
- **Purpose**: Process event ticket payments
- **Integration**: Server-side API calls

### Data Flow Examples

#### Event Booking Flow

```
User → Booking Form → Validation → Create Booking (Firestore) →
Create Payment Order (Razorpay API) → User Pays → Verify Payment →
Update Booking → Show Success Page
```

#### Admin Event Creation Flow

```
Admin Login → Create Event Form → Validation →
Save to Firestore → Redirect to Dashboard
```

---

## 3. Technology Stack

### Core Technologies

| Technology   | Version | Purpose                       | Documentation                                        |
| ------------ | ------- | ----------------------------- | ---------------------------------------------------- |
| Next.js      | 15.1.6  | React framework, routing, SSR | [nextjs.org](https://nextjs.org)                     |
| React        | 18.3.1  | UI library                    | [react.dev](https://react.dev)                       |
| TypeScript   | 5.7.2   | Type safety                   | [typescriptlang.org](https://www.typescriptlang.org) |
| Tailwind CSS | 3.4.17  | Styling                       | [tailwindcss.com](https://tailwindcss.com)           |
| Firebase     | 12.7.0  | Database & storage            | [firebase.google.com](https://firebase.google.com)   |
| Razorpay     | 2.9.6   | Payment processing            | [razorpay.com](https://razorpay.com)                 |

### UI Component Libraries

- **Radix UI**: Accessible, unstyled components
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

---

## 4. Getting Started

### Prerequisites

Before starting development, ensure you have:

1. **Node.js** v18.0.0 or higher
2. **npm** v9.0.0 or higher (or **yarn** v1.22.0+)
3. **Git** for version control
4. A code editor (VS Code recommended)
5. Firebase account (free tier is sufficient)
6. Razorpay account (test mode for development)

### Initial Setup

#### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd cognimuse-marketing-V2

# Install dependencies
npm install
```

#### Step 2: Environment Configuration

Create a `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

> **Note**: Never commit `.env.local` to version control. It's included in `.gitignore`.

#### Step 3: Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Firestore**
   - In Firebase Console, navigate to **Firestore Database**
   - Click "Create database"
   - Start in **test mode** for development
   - Choose a location close to your users

3. **Deploy Security Rules**

   ```bash
   # Install Firebase CLI globally
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Initialize Firebase in your project
   firebase init firestore

   # Deploy rules
   firebase deploy --only firestore:rules
   ```

4. **Enable Storage**
   - Navigate to **Storage** in Firebase Console
   - Click "Get started"
   - Use default security rules for now

#### Step 4: Razorpay Setup

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings → API Keys**
3. Copy both **Key ID** and **Key Secret**
4. Add to `.env.local`

> **Important**: Use test keys (starting with `rzp_test_`) during development.

#### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verify Setup

Test the following to ensure everything works:

1. ✅ Homepage loads correctly
2. ✅ Navigate to `/knowledge-hub` - articles and episodes appear
3. ✅ Navigate to `/events` - events page loads
4. ✅ Navigate to `/admin/login` - login page appears
5. ✅ Login with credentials: `admin` / `admin@cognimuse`

---

## 5. Application Features

### 5.1 Marketing Website

#### Homepage (`/`)

**Components Used:**

- `Hero` - Main hero section with CTA
- `TransitionSection` - Animated transition
- `ContentSection` - Services showcase
- `WhyChooseSection` - Benefits section
- `PackagesSection` - Pricing tiers
- `TestimonialsSection` - Client testimonials
- `Footer` - Site footer

**Key Features:**

- SEO optimized with metadata
- Structured data for search engines
- Responsive across all devices
- Smooth scroll animations
- WhatsApp floating button

#### About Us (`/about-us`)

- Company information
- Mission and values
- Team introduction

#### Contact Us (`/contact-us`)

- Contact form
- Business information
- Map integration (if needed)

#### Policy Pages

- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms and conditions
- `/cancellation-refund-policy` - Refund policy

---

### 5.2 Knowledge Hub

The Knowledge Hub is an educational content platform featuring articles and podcast episodes.

#### Hub Homepage (`/knowledge-hub`)

**Purpose**: Central landing page for all educational content

**Features:**

- Mixed display of articles and episodes
- Filter by content type (coming soon)
- Search functionality (coming soon)
- Responsive grid layout

**Data Sources:**

- `/data/outreach/articles.json`
- `/data/outreach/episodes.json`

#### Articles (`/knowledge-hub/articles/[slug]`)

**Dynamic Routes**: Each article has its own URL based on its ID

**Features:**

- Full article content with HTML rendering
- Table of contents (auto-generated from headings)
- Related episodes
- Meta tags for SEO
- Reading time estimate

**Article Structure:**

```json
{
  "id": "article-slug",
  "title": "Article Title",
  "date": "Date published",
  "tag": "Article",
  "excerpt": "Short summary",
  "image": "/path/to/image.png",
  "body": "<html content>",
  "metaTitle": "SEO title",
  "metaDescription": "SEO description"
}
```

#### Podcast Episodes (`/knowledge-hub/episode/[id]`)

**Dynamic Routes**: Each episode has its own page

**Features:**

- Episode summary
- Key themes
- Related articles
- YouTube integration (if `youtubeId` provided)
- Download option (future)

**Episode Structure:**

```json
{
  "id": "ep-001",
  "title": "Episode Title",
  "date": "Date published",
  "excerpt": "Short description",
  "image": "/path/to/image.png",
  "tag": "Episode",
  "youtubeId": "optional_youtube_id",
  "summary": "Full episode summary",
  "Key themes": "Theme 1, Theme 2, Theme 3",
  "articles": ["related-article-slug"]
}
```

#### Voices Program (`/knowledge-hub/voices`)

**Purpose**: Showcase the "Voices" outreach initiative

**Content**: Static page with program information

---

### 5.3 Event Management System

#### Public Event Features

##### Event Listing (`/events`)

**Components:**

- `EventCard` - Individual event display
- Filters (coming soon)

**Features:**

- Shows all active events
- Event cards with:
  - Event image
  - Title and tagline
  - Date and time
  - Attendee count
  - Tags
  - "View Details" button

##### Event Details (`/events/[id]`)

**Dynamic Route**: Individual event page

**Components:**

- `HeroSection` - Event hero with image
- `EventDetails` - Core information
- `SpeakerSection` - Speaker bio and photo
- `AgendaSection` - Event agenda/schedule
- `CTASection` - Registration call-to-action

**Information Displayed:**

- Full event description
- Date, time, timezone
- Location (online/offline)
- Ticket price
- Speaker information
- Key takeaways
- Agenda/schedule
- "Register Now" button → redirects to booking

##### Event Booking (`/book/[id]`)

**Purpose**: Registration and payment for events

**Form Fields:**

- Name (required)
- Phone number (required)
- Place/Location (required)
- Profession (required)
- Age (required)

**Features:**

- Form validation using Zod schemas
- Shows event details sidebar
- Calculates total amount
- Initiates Razorpay payment
- Handles free events (no payment)
- Creates booking in Firestore
- Redirects to success page

**Payment Flow:**

1. User fills form
2. Booking created in Firestore (status: pending)
3. Payment order created via `/api/payments/create-order`
4. Razorpay checkout opens
5. User completes payment
6. Payment verified via `/api/payments/verify`
7. Booking updated (status: success)
8. Redirect to success page

##### Booking Success (`/book/[id]/success`)

**Purpose**: Confirmation page after successful booking

**Displays:**

- Booking confirmation message
- Event details
- Meeting link (for online events)
- User information
- Payment details (if paid)
- Transaction IDs

**Features:**

- Copy meeting link to clipboard
- Direct "Join Meeting" button (if URL)
- Print confirmation (future)

---

#### Admin Features

##### Admin Login (`/admin/login`)

**Purpose**: Secure access to admin dashboard

**Credentials:**

- Username: `admin`
- Password: `admin@cognimuse`

**Security:**

- Session stored in `sessionStorage`
- 8-hour session timeout
- Auto-redirect to login if session expired

**Implementation**: `/lib/auth/admin-auth.ts`

##### Admin Dashboard (`/admin`)

**Protected Route**: Requires authentication

**Tabs:**

1. **Overview Tab**
   - Total events count
   - Total bookings count
   - Total revenue
   - Quick stats

2. **Events Tab**
   - Table of all events
   - Columns: Title, Date, Location, Price, Attendees, Actions
   - Actions: View, Edit, Delete
   - "Create Event" button

3. **Bookings & Payments Tab**
   - Table of all bookings
   - Columns: Name, Event, Date, Amount, Status, Payment ID
   - Filter by payment status
   - Search functionality

**Features:**

- Real-time data from Firestore
- Responsive table design
- Inline editing (future)
- Export to CSV (future)

##### Create Event (`/admin/events/create`)

**Purpose**: Add new events to the system

**Form Sections:**

1. **Basic Information**
   - Event title
   - Description
   - Event type (online/offline)

2. **Schedule**
   - Start date
   - End date
   - Start time
   - End time
   - Timezone

3. **Location**
   - For online: Meeting link/platform
   - For offline: Venue address

4. **Pricing**
   - Ticket price (₹)
   - Currency (default: INR)
   - Free event option

5. **Capacity**
   - Maximum attendees
   - Unlimited option

6. **Additional Details**
   - Featured event checkbox
   - Require approval checkbox
   - Custom questions (future)

**Validation:**

- All required fields checked
- Date/time logic validated
- Price must be non-negative

**On Submit:**

- Creates event in Firestore
- Generates unique event ID
- Redirects to dashboard

##### Edit Event (`/admin/events/edit/[eventId]`)

**Purpose**: Modify existing events

**Features:**

- Form pre-filled with event data
- Same validation as create
- Updates existing Firestore document
- Preserves creation timestamp

---

### 5.4 Additional Features

#### WhatsApp Integration

**Component**: `WhatsAppIcon`

**Features:**

- Floating button on all pages
- Click to open WhatsApp chat
- Customizable phone number
- Accessible and mobile-friendly

#### Scroll to Top

**Component**: `ScrollToTop`

**Features:**

- Appears after scrolling down
- Smooth scroll animation
- Accessible button

#### SEO Optimization

**Implementation**: `/app/layout.tsx`

**Features:**

- Dynamic metadata per page
- Open Graph tags for social sharing
- Structured data (JSON-LD)
- Sitemap generation (`/app/sitemap.ts`)
- Robots.txt

---

## 6. Database Structure

### Firestore Collections

#### `events` Collection

**Purpose**: Store all event data

**Document Structure:**

```typescript
{
  title: string;                    // Event title
  description: string;               // Full description
  startDate: string;                 // ISO date string
  endDate: string;                   // ISO date string
  startTime: string;                 // Time in HH:MM format
  endTime: string;                   // Time in HH:MM format
  timezone: string;                  // e.g., "Asia/Kolkata"
  location: string;                  // Meeting link or venue
  locationType: "online" | "offline"; // Event type
  ticketPrice: number;               // Price in rupees
  currency: string;                  // "INR"
  capacity: number | null;           // Max attendees (null = unlimited)
  requireApproval: boolean;          // Needs admin approval
  isActive: boolean;                 // Event is live
  featured: boolean;                 // Featured on homepage
  image?: string;                    // Event image URL
  gallery?: string[];                // Array of image URLs
  agenda?: string;                   // Agenda/schedule text
  questions?: Array<{               // Custom form questions
    id: string;
    label: string;
    required: boolean;
  }>;
  createdAt: string;                // ISO timestamp
  updatedAt: string;                // ISO timestamp
}
```

**Indexes**: None required (collection is small)

**Security Rules**: Read-only for public, full access for admin

#### `bookings` Collection

**Purpose**: Store user registrations and payment info

**Document Structure:**

```typescript
{
  eventId: string;                  // Reference to event
  name: string;                     // User's name
  phone: string;                    // Phone number
  place: string;                    // User's location
  profession: string;               // Occupation
  age: number;                      // Age
  createdAt: string;                // Booking timestamp
  paymentDetails: {
    status: "pending" | "success" | "failed";
    amount?: number;                // Amount paid
    currency?: string;              // "INR"
    transactionId?: string;         // Razorpay payment ID
    razorpayOrderId?: string;       // Order ID
    razorpayPaymentId?: string;     // Payment ID
  };
}
```

**Indexes**:

- `eventId` (for querying bookings by event)
- `paymentDetails.status` (for filtering by payment status)

**Security Rules**:

- Create: Anyone (with validation)
- Read/Update: Admin only

#### `errorLogs` Collection

**Purpose**: Log application errors for debugging

**Document Structure:**

```typescript
{
  functionName: string;             // Where error occurred
  message: string;                  // Error message
  stack?: string;                   // Stack trace
  info: object;                     // Additional context
  timestamp: string;                // When it happened
}
```

**Usage**: Automatic logging from `/lib/firebase/db-queries.ts`

**Security Rules**: Write-only (no reads to protect sensitive data)

---

### Database Operations

All database operations are centralized in `/lib/firebase/db-queries.ts`.

#### Key Functions

**Events:**

- `createEvent(eventData)` - Create new event
- `getEvent(eventId)` - Fetch single event
- `getAllEvents()` - Fetch all events
- `updateEvent(eventId, updates)` - Update event
- `deleteEvent(eventId)` - Delete event

**Bookings:**

- `createBooking(bookingData)` - Create booking
- `getBooking(bookingId)` - Fetch single booking
- `getAllBookings()` - Fetch all bookings
- `getBookingsByEvent(eventId)` - Bookings for specific event
- `updateBookingPayment(bookingId, paymentDetails)` - Update payment status

**Error Logging:**

- `logError(functionName, error, additionalInfo)` - Log errors automatically

---

## 7. API Reference

### POST `/api/payments/create-order`

**Purpose**: Create a Razorpay payment order

**Request Body:**

```json
{
  "amount": 50000, // Amount in paise (₹500 = 50000 paise)
  "currency": "INR",
  "bookingId": "abc123",
  "eventId": "event123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "orderId": "order_xyz789",
  "amount": 50000,
  "currency": "INR"
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Error message"
}
```

**Implementation**: Creates order, generates receipt ID, stores notes

**Error Handling**: Logs errors, returns appropriate HTTP status

---

### POST `/api/payments/verify`

**Purpose**: Verify payment signature and update booking

**Request Body:**

```json
{
  "razorpay_order_id": "order_xyz789",
  "razorpay_payment_id": "pay_abc123",
  "razorpay_signature": "signature_hash",
  "bookingId": "booking123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Payment verified and booking confirmed"
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Invalid payment signature"
}
```

**Security**:

- Verifies HMAC SHA256 signature
- Uses Razorpay key secret
- Updates booking only if valid

**Implementation**:

1. Verify signature
2. Fetch booking and event
3. Update booking with payment details
4. Return success/failure

---

### POST `/api/admin/upload`

**Purpose**: Upload images to Firebase Storage (future implementation)

**Request**: Multipart form data with image file

**Response**: Image URL

**Status**: Planned but not yet implemented

---

## 8. Component Library

### Layout Components

#### `Header`

**Location**: `/components/Header.tsx`

**Purpose**: Main navigation header

**Features:**

- Logo
- Navigation links
- Mobile hamburger menu
- Responsive design
- Active link highlighting

**Props**: None (static)

#### `Footer`

**Location**: `/components/Footer.tsx`

**Purpose**: Site footer

**Features:**

- Company information
- Quick links
- Social media links (future)
- Copyright notice

**Props**: None (static)

---

### Marketing Components

#### `Hero`

**Location**: `/components/Hero.tsx`

**Purpose**: Homepage hero section

**Features:**

- Main headline
- Subheadline
- CTA buttons
- Hero image/illustration

**Props**: None (content is static)

#### `ContentSection`

**Location**: `/components/ContentSection.tsx`

**Purpose**: Display services in a grid

**Features:**

- Icon + title + description cards
- Responsive grid
- Smooth animations

#### `PackagesSection`

**Location**: `/components/PackagesSection.tsx`

**Purpose**: Pricing tiers

**Features:**

- Package cards
- Price display
- Features list
- CTA buttons

#### `TestimonialsSection`

**Location**: `/components/TestimonialsSection.tsx`

**Purpose**: Client testimonials

**Features:**

- Testimonial cards
- Author info
- Carousel (if many testimonials)

---

### Event Components

#### `EventCard`

**Location**: `/components/EventCard.tsx`

**Purpose**: Display event in a card format

**Props:**

```typescript
{
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image?: string;
  attendees: number;
  capacity: number;
  tags: string[];
}
```

**Features:**

- Event image
- Date badge
- Price tag
- Click to view details

#### `EventHeader`

**Location**: `/components/EventHeader.tsx`

**Purpose**: Event details page header

**Props:**

```typescript
{
  title: string;
  tagline?: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}
```

---

### Knowledge Hub Components

#### `EpisodeCard`

**Location**: `/components/EpisodeCard.tsx`

**Purpose**: Display podcast episode

**Props:**

```typescript
{
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  tag: string;
}
```

**Features:**

- Episode thumbnail
- Title and excerpt
- Publication date
- Link to full episode

#### `ArticleTOC`

**Location**: `/components/ArticleTOC.tsx`

**Purpose**: Generate table of contents from article HTML

**Props:**

```typescript
{
  htmlContent: string;
}
```

**Features:**

- Auto-extracts headings
- Creates anchor links
- Sticky sidebar (desktop)
- Smooth scroll to section

---

### UI Components (Radix-based)

Located in `/components/ui/`

- `button` - Styled button variants
- `card` - Card container
- `dialog` - Modal dialogs
- `dropdown-menu` - Dropdown menus
- `input` - Form inputs
- `label` - Form labels
- `select` - Dropdown select
- `toast` - Toast notifications
- `tooltip` - Tooltips
- And more...

**Usage Example:**

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click Me
</Button>;
```

---

## 9. Development Workflow

### Code Organization

**Follow this structure:**

1. **Pages**: `/app/[route]/page.tsx`
2. **API Routes**: `/app/api/[endpoint]/route.ts`
3. **Components**: `/components/[ComponentName].tsx`
4. **Utilities**: `/lib/[category]/[utility].ts`
5. **Types**: Define in same file or `/types/[name].ts` if shared
6. **Styles**: Global in `globals.css`, component-specific in Tailwind

### Adding a New Page

1. **Create the page file**

   ```bash
   # Example: Create /services page
   mkdir -p app/services
   touch app/services/page.tsx
   ```

2. **Add basic structure**

   ```tsx
   import type { Metadata } from "next";

   export const metadata: Metadata = {
     title: "Services",
     description: "Our services",
   };

   export default function ServicesPage() {
     return (
       <div>
         <h1>Services</h1>
       </div>
     );
   }
   ```

3. **Add navigation link** in `Header.tsx`

4. **Test the page** at `http://localhost:3000/services`

### Adding a New Component

1. **Create the component file**

   ```bash
   touch components/NewComponent.tsx
   ```

2. **Write the component**

   ```tsx
   interface NewComponentProps {
     title: string;
     description?: string;
   }

   export default function NewComponent({
     title,
     description,
   }: NewComponentProps) {
     return (
       <div>
         <h2>{title}</h2>
         {description && <p>{description}</p>}
       </div>
     );
   }
   ```

3. **Import and use**

   ```tsx
   import NewComponent from "@/components/NewComponent";

   <NewComponent title="Hello" description="World" />;
   ```

### Adding a New API Route

1. **Create the route file**

   ```bash
   mkdir -p app/api/my-endpoint
   touch app/api/my-endpoint/route.ts
   ```

2. **Implement the handler**

   ```typescript
   import { NextRequest, NextResponse } from "next/server";

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();

       // Your logic here

       return NextResponse.json({ success: true });
     } catch (error: any) {
       return NextResponse.json(
         { success: false, error: error.message },
         { status: 500 },
       );
     }
   }
   ```

3. **Call from frontend**

   ```typescript
   const response = await fetch("/api/my-endpoint", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ data: "value" }),
   });

   const result = await response.json();
   ```

### Git Workflow

**Branch Naming:**

- `feature/[feature-name]` - New features
- `fix/[bug-description]` - Bug fixes
- `docs/[what-changed]` - Documentation
- `refactor/[what-changed]` - Code refactoring

**Commit Messages:**

```
feat: add event export functionality
fix: resolve payment verification issue
docs: update API documentation
refactor: simplify booking form validation
```

**Pull Request Process:**

1. Create feature branch from `main`
2. Make changes and commit
3. Push branch and create PR
4. Request code review
5. Make requested changes
6. Merge to `main` after approval

---

## 10. Testing Guide

### Manual Testing Checklist

#### Before Each Release

**Homepage:**

- [ ] Page loads without errors
- [ ] All images load
- [ ] Navigation works
- [ ] Mobile menu functions
- [ ] CTA buttons link correctly
- [ ] Footer links work

**Knowledge Hub:**

- [ ] Articles page loads
- [ ] Episodes page loads
- [ ] Individual article pages work
- [ ] Individual episode pages work
- [ ] Table of contents works
- [ ] Related content displays

**Events:**

- [ ] Events listing page loads
- [ ] Individual event pages load
- [ ] Event details display correctly
- [ ] "Register" button works

**Booking Flow:**

- [ ] Booking form loads
- [ ] Form validation works
- [ ] Can submit free event booking
- [ ] Can submit paid event booking
- [ ] Payment popup appears
- [ ] Test payment succeeds
- [ ] Success page shows correct data
- [ ] Booking appears in admin dashboard

**Admin Dashboard:**

- [ ] Login page works
- [ ] Can log in with credentials
- [ ] Dashboard loads
- [ ] Can view events
- [ ] Can create event
- [ ] Can edit event
- [ ] Can delete event
- [ ] Can view bookings
- [ ] Can filter bookings
- [ ] Can log out

#### Responsive Testing

Test on these viewports:

- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px
- Large desktop: 1920px

### Automated Testing (Future)

**Planned:**

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- API tests with Supertest

---

## 11. Deployment Guide

### Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables ready for production
- [ ] Firebase security rules deployed
- [ ] Razorpay switched to live mode (if going live)
- [ ] Test database vs. production database decision made
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Error monitoring set up (Sentry, etc.)

### Deploying to Vercel (Recommended)

**Step 1: Connect Repository**

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository

**Step 2: Configure Build Settings**

- Framework: Next.js (auto-detected)
- Build Command: `next build`
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install`

**Step 3: Add Environment Variables**
In Vercel dashboard, add all variables from `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- (all other Firebase variables)
- `RAZORPAY_KEY_ID` (use live key for production!)
- `RAZORPAY_KEY_SECRET` (use live secret!)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

**Step 4: Deploy**

- Click "Deploy"
- Wait for build to complete
- Visit your deployed site

**Step 5: Configure Custom Domain (Optional)**

1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed
4. Wait for verification

### Deploying to Firebase Hosting

**Step 1: Install Firebase CLI**

```bash
npm install -g firebase-tools
```

**Step 2: Login and Initialize**

```bash
firebase login
firebase init hosting
```

**Step 3: Configure `firebase.json`**

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

**Step 4: Build for Static Export**
Update `next.config.js`:

```javascript
module.exports = {
  output: "export",
  images: { unoptimized: true },
};
```

**Step 5: Build and Deploy**

```bash
npm run build
firebase deploy --only hosting
```

> **Note**: Static export doesn't support API routes. For full Next.js features, use Vercel.

### Environment-Specific Configuration

**Development:**

- Use Razorpay test keys
- Firebase test database
- Verbose error logging

**Production:**

- Use Razorpay live keys
- Firebase production database
- Error logging to monitoring service
- Enable analytics

---

## 12. Troubleshooting

### Common Issues and Solutions

#### Issue: "Firebase not initialized"

**Symptoms**: Errors about Firebase not being available

**Solutions:**

1. Check `.env.local` file exists
2. Verify all Firebase variables are set
3. Restart dev server after adding variables
4. Check for typos in variable names

#### Issue: Payment popup doesn't appear

**Symptoms**: Button clicks but nothing happens

**Solutions:**

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
3. Check if Razorpay script loaded (Network tab)
4. Verify order creation API works
5. Check browser pop-up blocker

#### Issue: "Event not found" in booking flow

**Symptoms**: Booking page shows error

**Solutions:**

1. Verify event exists in Firestore
2. Check event ID in URL matches Firestore ID
3. Check Firestore security rules allow read
4. Verify event has all required fields

#### Issue: Admin dashboard shows no data

**Symptoms**: Dashboard loads but tables are empty

**Solutions:**

1. Check Firestore security rules allow read
2. Verify events/bookings exist in database
3. Check browser console for errors
4. Verify Firebase config is correct

#### Issue: Styles not applying

**Symptoms**: Page looks unstyled or broken

**Solutions:**

1. Check Tailwind classes are correct
2. Verify `globals.css` is imported in layout
3. Check for CSS conflicts
4. Clear browser cache
5. Rebuild: `npm run build`

#### Issue: Build fails

**Symptoms**: `npm run build` errors

**Solutions:**

1. Check for TypeScript errors: `npm run lint`
2. Verify all dependencies installed
3. Check for missing imports
4. Ensure all components return valid JSX
5. Clear `.next` folder and rebuild

---

### Debugging Tips

**Enable Verbose Logging:**

```typescript
// In db-queries.ts
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

**Check Firestore Data:**

- Go to Firebase Console
- Navigate to Firestore Database
- Browse collections manually

**Check Network Requests:**

- Open Browser DevTools
- Go to Network tab
- Filter by API routes
- Inspect request/response

**Check React DevTools:**

- Install React DevTools extension
- Inspect component props and state
- Profile performance

---

## 13. Best Practices

### Code Style

**TypeScript:**

- Always define types for props and function parameters
- Use interfaces for object shapes
- Avoid `any` type (use `unknown` if needed)

**React Components:**

- One component per file
- Descriptive component names (PascalCase)
- Props interface before component definition
- Export default at the end

**File Naming:**

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

**Example:**

```typescript
// Good ✅
interface UserCardProps {
  name: string;
  email: string;
  onDelete: () => void;
}

export default function UserCard({ name, email, onDelete }: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// Bad ❌
export default function UserCard(props: any) {
  return <div>{props.name}</div>;
}
```

### Performance

**Image Optimization:**

- Use Next.js `<Image>` component
- Provide width and height
- Use WebP format when possible
- Lazy load images below fold

**Code Splitting:**

- Use dynamic imports for heavy components
- Lazy load admin dashboard components
- Split vendor bundles

**Example:**

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

**API Response Size:**

- Only return needed fields
- Paginate large lists
- Use Firestore queries efficiently

### Security

**Environment Variables:**

- Never commit `.env.local`
- Use `NEXT_PUBLIC_` prefix only for client-side variables
- Keep API secrets server-side only

**Input Validation:**

- Validate all form inputs
- Sanitize user input before displaying
- Use Zod schemas for validation

**Authentication:**

- Don't store sensitive data in `sessionStorage`
- Implement token expiration
- Use HTTPS in production

**Firestore Rules:**

- Restrict write access
- Validate data shapes
- Don't expose admin data

### Accessibility

**Semantic HTML:**

- Use `<header>`, `<nav>`, `<main>`, `<footer>`
- Use `<button>` for actions, `<a>` for links
- Proper heading hierarchy (h1 → h2 → h3)

**ARIA Labels:**

```tsx
<button aria-label="Close menu" onClick={handleClose}>
  <X />
</button>
```

**Keyboard Navigation:**

- All interactive elements focusable
- Visible focus states
- Logical tab order

**Color Contrast:**

- Meet WCAG AA standards (4.5:1 for text)
- Don't rely on color alone

---

## 14. Security Considerations

### Current Implementation

**Admin Authentication:**

- ⚠️ Client-side only (not ideal for production)
- Password stored in code (should be in environment variable)
- Session in `sessionStorage` (cleared on tab close)

**Recommended Improvements for Production:**

1. Implement server-side authentication
2. Use JWT tokens or HTTP-only cookies
3. Hash passwords (bcrypt)
4. Rate limit login attempts
5. Add two-factor authentication
6. Move credentials to environment variables

**Firestore Security:**

- Rules restrict reads and writes
- Validation on write operations
- Error logs are write-only

**Payment Security:**

- Signature verification on server
- No sensitive data in client
- HTTPS required in production

### Security Checklist

- [ ] All environment variables secured
- [ ] HTTPS enabled in production
- [ ] Firestore rules deployed and tested
- [ ] Payment signature verification works
- [ ] No sensitive data in Git repository
- [ ] Admin password changed from default
- [ ] Rate limiting on API routes (future)
- [ ] CORS configured properly
- [ ] CSP headers set (future)

---

## 15. Performance Optimization

### Current Optimizations

- ✅ Next.js automatic code splitting
- ✅ Responsive images with WebP format
- ✅ Lazy loading of components
- ✅ Tailwind CSS purging unused styles
- ✅ Firestore query optimization

### Additional Recommendations

**Frontend:**

1. **Image Optimization**
   - Convert all images to WebP
   - Implement responsive images
   - Use Next.js `<Image>` component

2. **Bundle Size**
   - Analyze bundle: `npm run build -- --analyze`
   - Remove unused dependencies
   - Use dynamic imports for large libraries

3. **Caching**
   - Cache API responses
   - Use SWR or React Query for data fetching
   - Implement service worker (PWA)

**Backend:**

1. **Database Queries**
   - Add indexes for common queries
   - Limit query results
   - Use pagination for large lists

2. **API Routes**
   - Implement caching headers
   - Compress responses
   - Rate limiting

**Monitoring:**

1. Set up performance monitoring (Vercel Analytics, Firebase Performance)
2. Monitor Lighthouse scores
3. Track Core Web Vitals
4. Set up error tracking (Sentry)

---

## Conclusion

This documentation covers the complete technical implementation of the CogniMuse Marketing platform. For additional help:

- Review the code comments
- Check individual documentation files
- Contact the development team

**Happy coding! 🚀**

---

**Document Version:** 1.0  
**Last Updated:** February 25, 2026  
**Next Review:** May 25, 2026
