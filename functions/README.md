# CogniMuse Analytics Dashboard - Cloud Functions

This folder contains Firebase Cloud Functions for the CogniMuse marketing platform.

## 📊 Analytics Dashboard Function

The `analyticsDashboard` function provides a real-time analytics dashboard that displays insights from all successful event bookings.

### Features

- **Total Bookings & Revenue**: Quick overview of business metrics
- **Referrer Performance**: Key metric showing leads from each referrer with count and revenue
- **Profession Breakdown**: Understand your audience composition
- **Platform Sources**: See where your attendees discovered the events
- **Top Locations**: Geographic distribution of bookings
- **Recent Bookings**: Latest 10 successful registrations

### Data Source

Fetches from the `bookings` collection where `paymentDetails.status === "success"`

## 🚀 Setup & Deployment

### 1. Install Dependencies

```bash
cd functions
npm install
```

### 2. Build TypeScript

```bash
npm run build
```

### 3. Deploy to Firebase

```bash
npm run deploy
```

Or from the root directory:

```bash
firebase deploy --only functions
```

### 4. Access the Dashboard

After deployment, your function will be available at:

```
https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/analyticsDashboard
```

Example:

```
https://us-central1-cognimuse-app.cloudfunctions.net/analyticsDashboard
```

## 🧪 Local Testing

### Run Functions Emulator

```bash
npm run serve
```

Then access at:

```
http://localhost:5001/YOUR_PROJECT_ID/YOUR_REGION/analyticsDashboard
```

## 📋 Environment Variables

No additional environment variables needed - uses Firebase Admin SDK with default credentials.

## 🔒 Security Considerations

### Current Setup

- Public access (no authentication required)
- Read-only operations
- Safe for internal team use

### Recommended for Production

Add authentication if needed:

```typescript
export const analyticsDashboard = functions.https.onRequest(
  async (req, res) => {
    // Add API key authentication
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== functions.config().dashboard.apikey) {
      return res.status(401).send("Unauthorized");
    }

    // Rest of the code...
  },
);
```

Set the API key:

```bash
firebase functions:config:set dashboard.apikey="YOUR_SECRET_KEY"
```

## 📊 Dashboard Sections

### 1. Overview Cards

- Total Bookings
- Total Revenue
- Unique Referrers
- Average Revenue per Booking

### 2. Referrer Performance (Primary Focus)

Shows each referrer with:

- Number of leads generated
- Total revenue from their referrals
- Sorted by lead count (highest first)

### 3. Analytics Charts

- Profession distribution with percentages
- Platform sources (LinkedIn, Instagram, WhatsApp, etc.)
- Top 10 locations by booking count

### 4. Recent Bookings Table

Latest 10 bookings with:

- Name, Email, Profession
- Referrer source
- Amount paid
- Registration date/time

## 🎨 Customization

### Update Styling

Edit the `<style>` section in the `renderDashboard()` function to match your brand colors.

### Add More Metrics

Extend the `AnalyticsData` interface and aggregation logic in the main function.

### Export Data

Add CSV/Excel export by modifying the response format based on query parameters:

```typescript
if (req.query.format === "csv") {
  // Generate CSV
  res.setHeader("Content-Type", "text/csv");
  res.send(generateCSV(analytics));
}
```

## 📝 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run serve` - Run functions locally with emulator
- `npm run deploy` - Deploy functions to Firebase
- `npm run logs` - View function logs

## 🐛 Troubleshooting

### Function not deploying?

1. Ensure you're logged in: `firebase login`
2. Check your Firebase project: `firebase use --add`
3. Verify billing is enabled (Cloud Functions require Blaze plan)

### No data showing?

1. Verify bookings exist in Firestore with `paymentDetails.status === "success"`
2. Check Firestore indexes if queries are failing
3. View logs: `firebase functions:log`

### Permission errors?

Ensure Firebase Admin SDK has Firestore read permissions (default for Cloud Functions).

## 📄 License

Part of the CogniMuse marketing platform.
