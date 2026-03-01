import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();

interface BookingData {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  place: string;
  profession: string;
  specialization?: string;
  course?: string;
  year?: string;
  otherProfession?: string;
  referrer?: string;
  platformSeen?: string;
  otherPlatform?: string;
  paymentDetails: {
    status: "pending" | "success" | "failed";
    amount?: number;
    currency?: string;
  };
  createdAt: string;
}

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  referrerStats: Record<string, { count: number; revenue: number }>;
  recentBookings: Array<{
    name: string;
    email: string;
    phone: string;
    referrer?: string;
    date: string;
  }>;
}

/**
 * Cloud Function that displays analytics dashboard for successful bookings
 * Access at: https://YOUR-PROJECT.cloudfunctions.net/analyticsDashboard
 */
export const analyticsDashboard = functions.https.onRequest(
  async (req, res): Promise<void> => {
    try {
      // Set CORS headers
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST");

      // Handle CSV export request
      if (req.query.format === "csv") {
        const bookingsRef = admin.firestore().collection("bookings");
        const snapshot = await bookingsRef
          .where("paymentDetails.status", "==", "success")
          .get();

        const csvData = generateCSV(snapshot);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="bookings-${new Date().toISOString().split("T")[0]}.csv"`
        );
        res.send(csvData);
        return;
      }

      // Fetch all successful bookings from Firestore
      const bookingsRef = admin.firestore().collection("bookings");
      const snapshot = await bookingsRef
        .where("paymentDetails.status", "==", "success")
        .get();

      if (snapshot.empty) {
        res.send(renderEmptyDashboard());
        return;
      }

      // Process and aggregate data
      const analytics: AnalyticsData = {
        totalBookings: 0,
        totalRevenue: 0,
        referrerStats: {},
        recentBookings: [],
      };

      const bookings: BookingData[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as BookingData;
        bookings.push(data);

        // Total bookings
        analytics.totalBookings++;

        // Total revenue
        const amount = data.paymentDetails?.amount || 0;
        analytics.totalRevenue += amount;

        // Referrer statistics (KEY FOCUS)
        const referrer = data.referrer || "Direct/Unknown";
        if (!analytics.referrerStats[referrer]) {
          analytics.referrerStats[referrer] = { count: 0, revenue: 0 };
        }
        analytics.referrerStats[referrer].count++;
        analytics.referrerStats[referrer].revenue += amount;
      });

      // Sort and get all bookings
      const sortedBookings = bookings.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      analytics.recentBookings = sortedBookings.map((booking) => ({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        referrer: booking.referrer,
        date: booking.createdAt,
      }));

      // Render HTML dashboard
      const html = renderDashboard(analytics);
      res.status(200).send(html);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).send(renderErrorDashboard(error));
    }
  }
);

/**
 * Renders the analytics dashboard HTML
 */
function renderDashboard(analytics: AnalyticsData): string {
  // Sort referrers by count (descending)
  const sortedReferrers = Object.entries(analytics.referrerStats)
    .sort(([, a], [, b]) => b.count - a.count);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events Analytics</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #FCF4E1 0%, #fff 100%);
            color: #1E1E1E;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px 20px;
            background: linear-gradient(135deg, #155DFC 0%, #1B5FD4 100%);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(21, 93, 252, 0.2);
        }
        
        h1 {
            color: white;
            font-size: 2.2rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.95rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }
        
        .stat-label {
            color: #666;
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        
        .stat-value {
            color: #155DFC;
            font-size: 2rem;
            font-weight: 700;
        }
        
        .section {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            margin-bottom: 30px;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .section-title {
            font-size: 1.4rem;
            color: #1E1E1E;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: linear-gradient(180deg, #155DFC 0%, #EF7438 100%);
            border-radius: 4px;
        }
        
        .csv-btn {
            background: linear-gradient(135deg, #EF7438 0%, #FF6B35 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.875rem;
        }
        
        .csv-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 116, 56, 0.3);
        }
        
        .referrer-grid {
            display: grid;
            gap: 12px;
        }
        
        .referrer-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #155DFC;
            transition: background 0.2s;
        }
        
        .referrer-item:hover {
            background: #f0f2f5;
        }
        
        .referrer-name {
            font-weight: 600;
            color: #1E1E1E;
            font-size: 1rem;
        }
        
        .referrer-stats {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        
        .stat-badge {
            text-align: center;
        }
        
        .stat-badge-label {
            color: #666;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .stat-badge-value {
            color: #155DFC;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .revenue-badge {
            text-align: center;
        }
        
        .revenue-badge-label {
            color: #666;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .revenue-badge-value {
            color: #EF7438;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        
        th {
            background: #f8f9fa;
            padding: 14px;
            text-align: left;
            font-weight: 700;
            color: #1E1E1E;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 2px solid #e9ecef;
        }
        
        td {
            padding: 12px 14px;
            border-bottom: 1px solid #e9ecef;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .table-container {
            overflow-x: auto;
        }
        
        .timestamp {
            color: #999;
            font-size: 0.85rem;
            text-align: center;
            margin-top: 40px;
            padding: 20px;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 1.75rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .section-header {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }
            
            .referrer-stats {
                flex-direction: column;
                gap: 8px;
                align-items: flex-end;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📊 Events Analytics</h1>
            <p class="subtitle">Booking performance and referrer insights</p>
        </header>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Total Users Booked</div>
                <div class="stat-value">${analytics.totalBookings}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Revenue</div>
                <div class="stat-value">₹${analytics.totalRevenue.toLocaleString()}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Avg Revenue/Booking</div>
                <div class="stat-value">₹${Math.round(analytics.totalRevenue / analytics.totalBookings).toLocaleString()}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Leads by Referrer</h2>
            </div>
            <div class="referrer-grid">
                ${sortedReferrers.map(([referrer, stats]) => `
                    <div class="referrer-item">
                        <span class="referrer-name">${referrer}</span>
                        <div class="referrer-stats">
                            <div class="stat-badge">
                                <div class="stat-badge-label">Leads</div>
                                <div class="stat-badge-value">${stats.count}</div>
                            </div>
                            <div class="revenue-badge">
                                <div class="revenue-badge-label">Revenue</div>
                                <div class="revenue-badge-value">₹${stats.revenue.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">All Bookings</h2>
                <button class="csv-btn" onclick="downloadCSV()">📥 Download CSV</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Referrer</th>
                            <th>Booking Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${analytics.recentBookings.map((booking) => `
                            <tr>
                                <td><strong>${booking.name}</strong></td>
                                <td>${booking.email}</td>
                                <td>${booking.phone}</td>
                                <td>${booking.referrer || "Direct/Unknown"}</td>
                                <td>${new Date(booking.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="timestamp">
            Last refreshed: ${new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
        </div>
    </div>
    
    <script>
        function downloadCSV() {
            const url = new URL(window.location);
            url.searchParams.set('format', 'csv');
            window.location.href = url.toString();
        }
    </script>
</body>
</html>
  `;
}

/**
 * Generates CSV from bookings data
 */
function generateCSV(snapshot: FirebaseFirestore.QuerySnapshot): string {
  const headers = ["Name", "Email", "Phone", "Referrer", "Amount", "Booking Date"];
  const rows: string[] = [headers.map(h => `"${h}"`).join(",")];

  snapshot.forEach((doc) => {
    const data = doc.data() as BookingData;
    const row = [
      `"${data.name}"`,
      `"${data.email}"`,
      `"${data.phone}"`,
      `"${data.referrer || "Direct/Unknown"}"`,
      `${data.paymentDetails?.amount || 0}`,
      `"${new Date(data.createdAt).toLocaleDateString("en-IN")}"`,
    ];
    rows.push(row.join(","));
  });

  return rows.join("\n");
}

/**
 * Renders empty dashboard when no bookings found
 */
function renderEmptyDashboard(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CogniMuse Analytics Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #FCF4E1 0%, #fff 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .empty-state {
            text-align: center;
            background: white;
            padding: 60px 40px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 500px;
        }
        h1 {
            color: #155DFC;
            font-size: 2rem;
            margin-bottom: 16px;
        }
        p {
            color: #666;
            font-size: 1.125rem;
        }
    </style>
</head>
<body>
    <div class="empty-state">
        <h1>📊 No Data Yet</h1>
        <p>No successful bookings found. The dashboard will populate once users start registering for events.</p>
    </div>
</body>
</html>
  `;
}

/**
 * Renders error dashboard
 */
function renderErrorDashboard(error: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - CogniMuse Analytics</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #FCF4E1 0%, #fff 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .error-state {
            text-align: center;
            background: white;
            padding: 60px 40px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        h1 {
            color: #dc3545;
            font-size: 2rem;
            margin-bottom: 16px;
        }
        p {
            color: #666;
            font-size: 1rem;
            margin-bottom: 20px;
        }
        code {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 8px;
            display: block;
            text-align: left;
            color: #dc3545;
            font-size: 0.875rem;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="error-state">
        <h1>⚠️ Error Loading Dashboard</h1>
        <p>An error occurred while fetching analytics data.</p>
        <code>${error?.message || "Unknown error"}</code>
    </div>
</body>
</html>
  `;
}
