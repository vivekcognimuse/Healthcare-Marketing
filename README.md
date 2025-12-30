# Muse Marketing Website

A modern, responsive website for Muse Marketing - Expert Marketing for Healthcare Professionals.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Red Hat Display** - Custom typography font

## Features

- Fully responsive design (Mobile 375px, Tablet 744px, Desktop 1440px, Desktop 1728px)
- Custom typography system with responsive font sizes
- Modern UI components
- Smooth animations and transitions
- Accessible navigation
- SEO optimized

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Assets

Place all PNG assets in the `public` folder with the following naming convention:

### Icons
- `/public/icons/branding-icon.png`
- `/public/icons/website-icon.png`
- `/public/icons/seo-icon.png`
- `/public/icons/long-video-icon.png`
- `/public/icons/campaign-icon.png`
- `/public/icons/short-video-icon.png`
- `/public/icons/healthcare-icon.png`
- `/public/icons/support-icon.png`
- `/public/icons/growth-icon.png`
- `/public/icons/compliance-icon.png`
- `/public/icons/patient-icon.png`
- `/public/icons/whatsapp-icon.png`

### Images
- `/public/hero-illustration.png`
- `/public/videos/before-video.png`
- `/public/videos/after-video.png`
- `/public/testimonials/dr-ananya.png`
- `/public/testimonials/mr-rahul.png`

## Typography

The website uses a custom responsive typography system with Red Hat Display font:

- **H1, H2, H3** - Bold weights
- **P1, P2** - Regular weights
- **Button 1, Button 2** - Bold weights
- **Footnote** - Regular weight

Font sizes automatically adjust based on viewport width.

## Colors

- Primary Blue: `#155DFC`
- White: `#FAFAFA`
- Black: `#1E1E1E`

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with font setup
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles and typography utilities
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── TransitionSection.tsx
│   ├── ContentSection.tsx
│   ├── WhyChooseSection.tsx
│   ├── PackagesSection.tsx
│   ├── TestimonialsSection.tsx
│   └── Footer.tsx
├── public/               # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## License

Copyright © Muse Marketing Services

