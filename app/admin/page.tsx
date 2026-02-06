"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllEvents, getAllBookings, deleteEvent, type EventData, type BookingData } from "@/lib/firebase/db-queries";
import { Plus, Edit, Trash2, Users, DollarSign, Calendar, Eye, LogOut, Copy, Check, Download } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isAdminAuthenticated, clearAdminSession } from "@/lib/auth/admin-auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<(EventData & { id: string })[]>([]);
  const [bookings, setBookings] = useState<(BookingData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"events" | "bookings">("events");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(EventData & { id: string }) | null>(null);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setAuthLoading(false);
    loadData();
  }, [router]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      clearAdminSession();
      router.push("/admin/login");
    }
  };

  const loadData = async () => {
    setLoading(true);
    const [eventsResult, bookingsResult] = await Promise.all([
      getAllEvents(),
      getAllBookings(),
    ]);
    if (eventsResult.success) setEvents(eventsResult.data as any);
    if (bookingsResult.success) setBookings(bookingsResult.data as any);
    setLoading(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
    const result = await deleteEvent(eventId);
    if (result.success) {
      loadData();
    } else {
      alert("Failed to delete event: " + result.error);
    }
  };

  const copyBookingLink = async (eventId: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://musemarketing.web.app';
    const bookingLink = `${baseUrl}/book/${eventId}`;
    
    try {
      await navigator.clipboard.writeText(bookingLink);
      setCopiedEventId(eventId);
      setTimeout(() => setCopiedEventId(null), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = bookingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEventId(eventId);
      setTimeout(() => setCopiedEventId(null), 2000);
    }
  };

  const downloadEmailsCSV = () => {
    if (bookings.length === 0) {
      alert("No bookings available to export.");
      return;
    }

    // Filter bookings that have email addresses
    const bookingsWithEmails = bookings.filter(booking => booking.email && booking.email.trim() !== "");
    
    if (bookingsWithEmails.length === 0) {
      alert("No bookings with email addresses found.");
      return;
    }

    // Create CSV content
    const headers = ["Name", "Email", "Phone", "Event ID", "Booking Date", "Payment Status", "Amount"];
    const rows = bookingsWithEmails.map(booking => {
      const bookingDate = booking.createdAt 
        ? new Date(booking.createdAt).toLocaleDateString("en-US", { 
            year: "numeric", 
            month: "short", 
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        : "N/A";
      
      return [
        booking.name || "",
        booking.email || "",
        booking.phone || "",
        booking.eventId || "",
        bookingDate,
        booking.paymentDetails?.status || "pending",
        booking.paymentDetails?.amount !== undefined 
          ? (booking.paymentDetails.amount === 0 ? "Free" : `₹${booking.paymentDetails.amount}`)
          : "N/A"
      ];
    });

    // Escape CSV values (handle commas, quotes, newlines)
    const escapeCSV = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    // Combine headers and rows
    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => row.map(escapeCSV).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `booking_emails_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const totalRevenue = bookings
    .filter((b) => b.paymentDetails?.status === "success")
    .reduce((sum, b) => sum + (b.paymentDetails?.amount || 0), 0);

  const successfulBookings = bookings.filter((b) => b.paymentDetails?.status === "success").length;

  if (authLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="typography-p2 text-black/60">Verifying authentication...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-8 px-4 pt-20 sm:pt-24 lg:pt-28">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="typography-h1 text-black mb-2">Admin Dashboard</h1>
              <p className="typography-p2 text-black/60">Manage events, bookings, and payments</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-outline typography-btn2 px-4 py-2 inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="typography-p2 text-black/60">Total Events</span>
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="typography-h2 text-black">{events.length}</p>
            </div>
            <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="typography-p2 text-black/60">Total Bookings</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="typography-h2 text-black">{successfulBookings}</p>
            </div>
            <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="typography-p2 text-black/60">Total Revenue</span>
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="typography-h2 text-black">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-black/10">
            <button
              onClick={() => setActiveTab("events")}
              className={`pb-4 px-2 typography-btn2 transition-colors ${
                activeTab === "events"
                  ? "text-primary border-b-2 border-primary"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`pb-4 px-2 typography-btn2 transition-colors ${
                activeTab === "bookings"
                  ? "text-primary border-b-2 border-primary"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Bookings & Payments
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="typography-p2 text-black/60">Loading...</p>
            </div>
          ) : activeTab === "events" ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="typography-h3 text-black">All Events</h2>
                <Link
                  href="/admin/events/create"
                  className="btn-primary typography-btn2 px-6 py-3 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Event
                </Link>
              </div>

              {events.length === 0 ? (
                <div className="text-center py-12 bg-black/5 rounded-lg">
                  <p className="typography-p2 text-black/60 mb-4">No events found</p>
                  <Link href="/admin/events/create" className="btn-primary typography-btn2 px-6 py-3 inline-block">
                    Create Your First Event
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white border border-black/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="typography-h3 text-black mb-2">{event.title}</h3>
                          <p className="typography-p2 text-black/60 mb-2 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-3">
                            <span className="typography-footnote text-black/60">
                              {new Date(event.startDate).toLocaleDateString()} {event.startTime}
                            </span>
                            <span className="typography-footnote text-black/60">
                              {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
                            </span>
                            {event.capacity && (
                              <span className="typography-footnote text-black/60">
                                Capacity: {event.capacity}
                              </span>
                            )}
                            <span
                              className={`typography-footnote ${
                                event.isActive ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {event.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => copyBookingLink(event.id)}
                            className="btn-outline typography-btn2 px-4 py-2 inline-flex items-center gap-2 text-black hover:bg-primary hover:text-white transition-colors"
                            title="Copy booking link"
                          >
                            {copiedEventId === event.id ? (
                              <>
                                <Check className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy Link
                              </>
                            )}
                          </button>
                          <Link
                            href={`/book/${event.id}`}
                            target="_blank"
                            className="btn-outline typography-btn2 px-4 py-2 inline-flex items-center gap-2 text-black"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                          <Link
                            href={`/admin/events/edit/${event.id}`}
                            className="btn-primary typography-btn2 px-4 py-2 inline-flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="bg-red-500 text-white typography-btn2 px-4 py-2 rounded inline-flex items-center gap-2 hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="typography-h3 text-black">All Bookings & Payments</h2>
                {bookings.length > 0 && (
                  <button
                    onClick={downloadEmailsCSV}
                    className="btn-secondary typography-p2 py-2 px-4 rounded flex items-center gap-2 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download Emails CSV
                  </button>
                )}
              </div>
              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-black/5 rounded-lg">
                  <p className="typography-p2 text-black/60">No bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Name</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Email</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Phone</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Place</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Profession</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Age</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Event ID</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Amount</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Status</th>
                        <th className="text-left py-3 px-4 typography-p2 text-black/60">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-black/5 hover:bg-black/5">
                          <td className="py-3 px-4 typography-p2 text-black">{booking.name}</td>
                          <td className="py-3 px-4 typography-p2 text-black">{booking.email || "-"}</td>
                          <td className="py-3 px-4 typography-p2 text-black">{booking.phone}</td>
                          <td className="py-3 px-4 typography-p2 text-black">{booking.place}</td>
                          <td className="py-3 px-4 typography-p2 text-black">{booking.profession}</td>
                          <td className="py-3 px-4 typography-p2 text-black">{booking.age}</td>
                          <td className="py-3 px-4 typography-footnote text-primary font-mono">
                            {booking.eventId.slice(0, 8)}...
                          </td>
                          <td className="py-3 px-4 typography-p2 text-black">
                            {booking.paymentDetails?.amount ? `₹${booking.paymentDetails.amount}` : "-"}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`typography-footnote px-2 py-1 rounded ${
                                booking.paymentDetails?.status === "success"
                                  ? "bg-green-100 text-green-700"
                                  : booking.paymentDetails?.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {booking.paymentDetails?.status || "pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4 typography-footnote text-black/60">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
