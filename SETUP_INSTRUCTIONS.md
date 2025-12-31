# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Assets**
   - Place all PNG assets in the `public` folder according to `ASSETS_CHECKLIST.md`
   - Ensure all file names match exactly as specified

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Muse-marketing/
├── app/
│   ├── layout.tsx          # Root layout with font configuration
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles and typography system
├── components/
│   ├── Header.tsx          # Navigation header with mobile menu
│   ├── Hero.tsx            # Hero section with CTA buttons
│   ├── TransitionSection.tsx
│   ├── ContentSection.tsx  # Services grid section
│   ├── WhyChooseSection.tsx
│   ├── PackagesSection.tsx # Pricing packages
│   ├── TestimonialsSection.tsx # Testimonials carousel
│   └── Footer.tsx          # Footer with CTA
├── public/
│   ├── icons/              # Service and feature icons
│   ├── videos/             # Video placeholders
│   └── testimonials/       # Testimonial profile images
└── tailwind.config.ts      # Tailwind configuration

```

## Typography System

The website uses a custom responsive typography system:

- **Mobile (375px)**: Smallest font sizes
- **Tablet (744px)**: Medium font sizes
- **Desktop (1440px)**: Large font sizes
- **Desktop (1728px)**: Largest font sizes

All typography classes automatically adjust based on viewport width:
- `.typography-h1`, `.typography-h2`, `.typography-h3`
- `.typography-p1`, `.typography-p2`
- `.typography-btn1`, `.typography-btn2`
- `.typography-footnote`

## Color Palette

- **Primary Blue**: `#155DFC` - Used for buttons, links, and accents
- **White**: `#FAFAFA` - Background color
- **Black**: `#1E1E1E` - Text color

## Responsive Breakpoints

- Mobile: Default (375px+)
- Tablet: 744px+
- Desktop 1440: 1440px+
- Desktop 1728: 1728px+

## Features

✅ Fully responsive design
✅ Mobile-first approach
✅ Custom typography system
✅ Smooth animations
✅ Accessible navigation
✅ SEO optimized
✅ TypeScript support
✅ Modern React patterns

## Building for Production

```bash
npm run build
npm start
```

## Notes

- All images should be optimized for web
- Icons should have transparent backgrounds where appropriate
- The website is fully functional even without assets (images will show broken image icons until assets are added)

