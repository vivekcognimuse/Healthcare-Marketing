"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/firebase/db-queries";
import { Calendar, Clock, MapPin, Globe, DollarSign, Users, CheckCircle, Plus, ArrowLeft, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isAdminAuthenticated } from "@/lib/auth/admin-auth";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setAuthLoading(false);
  }, [router]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "GMT+05:30",
    location: "",
    locationType: "online" as "online" | "offline",
    ticketPrice: "0",
    currency: "INR",
    capacity: "",
    requireApproval: false,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const eventData = {
      ...formData,
      ticketPrice: parseFloat(formData.ticketPrice) || 0,
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
    };

    const result = await createEvent(eventData);
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Failed to create event. Please try again.");
      setLoading(false);
    }
  };

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
      <div 
        className="min-h-screen py-8 px-4 pt-20 sm:pt-24 lg:pt-28 relative"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 typography-p2 text-black/60 hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="typography-h1 text-black">Create New Event</h1>
                <p className="typography-p2 text-black/60 mt-1">
                  Fill in the details to create a new podcast event
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">⚠️</div>
              <p className="typography-p2 text-red-700 flex-1">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="typography-h3 text-black">Event Information</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className="typography-p2 text-black mb-3 block font-semibold">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="typography-p2 text-black mb-3 block font-semibold">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none hover:border-black/20"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="typography-h3 text-black">Schedule</h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="startDate" className="typography-p2 text-black mb-3 block font-semibold">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="typography-p2 text-black mb-3 block font-semibold">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="startTime" className="typography-p2 text-black mb-3 block font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Start Time *
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      required
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="typography-p2 text-black mb-3 block font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      End Time *
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      required
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timezone" className="typography-p2 text-black mb-3 block font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Timezone *
                  </label>
                  <input
                    type="text"
                    id="timezone"
                    name="timezone"
                    required
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="typography-h3 text-black">Location</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="locationType" className="typography-p2 text-black mb-3 block font-semibold">
                    Location Type *
                  </label>
                  <select
                    id="locationType"
                    name="locationType"
                    required
                    value={formData.locationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20 cursor-pointer"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="typography-p2 text-black mb-3 block font-semibold">
                    Location / Link *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                  />
                </div>
              </div>
            </div>

            {/* Event Options */}
            <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="typography-h3 text-black">Event Options</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="ticketPrice" className="typography-p2 text-black mb-3 block font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Ticket Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                  />
                  <p className="typography-footnote text-black/60 mt-2">
                    Set to 0 for free events (no payment required)
                  </p>
                </div>

                <div>
                  <label htmlFor="capacity" className="typography-p2 text-black mb-3 block font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-black/20"
                  />
                  <p className="typography-footnote text-black/60 mt-2">
                    Leave empty for unlimited capacity
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 p-4 bg-black/5 rounded-lg hover:bg-black/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      id="requireApproval"
                      name="requireApproval"
                      checked={formData.requireApproval}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-2 border-black/20 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="requireApproval" className="typography-p2 text-black flex-1 cursor-pointer flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Require Approval
                    </label>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-black/5 rounded-lg hover:bg-black/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-2 border-black/20 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="isActive" className="typography-p2 text-black flex-1 cursor-pointer">
                      Event is Active
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-secondary typography-btn2 py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Creating Event...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Event
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-outline typography-btn2 py-4 px-8 rounded-lg font-semibold transition-all hover:bg-white/10"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
