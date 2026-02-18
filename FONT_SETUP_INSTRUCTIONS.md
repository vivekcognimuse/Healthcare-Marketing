# Font Setup Instructions

## PP Editorial New Font

To complete the hero section design update, you need to add the PP Editorial New font files to your project.

### Steps:

1. **Create a fonts directory** in your `public` folder:

   ```
   public/fonts/
   ```

2. **Add the PP Editorial New font files** to this directory:
   - `PPEditorialNew-Regular.woff2`
   - `PPEditorialNew-Regular.woff`
   - `PPEditorialNew-Bold.woff2` (optional, for bold text)
   - `PPEditorialNew-Bold.woff` (optional, for bold text)

3. **Purchase/Download the font** from:
   - [Pangram Pangram](https://pangrampangram.com/products/editorial-new) (official source)
   - Or use your existing license if you have one

### Alternative: Use a Free Serif Font

If you don't have access to PP Editorial New, you can use these free alternatives:

**Option 1: Crimson Pro (Google Font)**
Update `app/layout.tsx`:

```tsx
import { Red_Hat_Display, Anonymous_Pro, Crimson_Pro } from "next/font/google";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pp-editorial",
});
```

**Option 2: Libre Baskerville (Google Font)**

```tsx
import {
  Red_Hat_Display,
  Anonymous_Pro,
  Libre_Baskerville,
} from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pp-editorial",
});
```

Then update the body className:

```tsx
<body className={`${redHatDisplay.variable} ${anonymousPro.variable} ${crimsonPro.variable} font-sans antialiased`}>
```

And update EventDetails.tsx to use the CSS variable:

```tsx
style={{
  fontFamily: "var(--font-pp-editorial)",
  letterSpacing: "-0.02em"
}}
```

## Fonts Currently Configured

### 1. **Anonymous Pro** ✅ (Already configured)

- Used for: Event tag/badge
- Source: Google Fonts
- Background: #EF7438
- No additional setup needed

### 2. **PP Editorial New** ⚠️ (Needs font files)

- Used for: Event title
- Source: Premium font (requires purchase or license)
- Fallback: Georgia, serif

## Design Specifications Applied

✅ Hero Image:

- Width: 1728px (max-width, responsive)
- Height: 747px
- Padding: 48px top/bottom
- Border radius: 100px (bottom corners)

✅ Tag (Anonymous Pro):

- Font: Anonymous Pro
- Background: #EF7438
- Color: White
- Padding: 16px (4px vertical, 16px horizontal)

✅ Title (PP Editorial New):

- Font: PP Editorial New
- Size: Responsive (4xl to 6xl)
- Letter spacing: -0.02em
- Color: #1E1E1E

## Verification

After adding the font files or choosing an alternative, verify by:

1. Running `npm run dev`
2. Navigating to any event page
3. Checking that the title displays in the correct serif font
4. Checking that the tag displays with Anonymous Pro font
