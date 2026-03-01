"use client";
import React, { useState, useEffect } from "react";
import { events } from "@/data/events";
import { ChevronRight, Check, Share2, MessageCircle, Linkedin, Instagram, Copy } from "lucide-react";
import Button from "../Button";

const RegistrationFormMultiStep: React.FC<{
  eventId: string;
  ticketPrice?: number;
  currency?: string;
  eventTitle?: string;
  eventDate?: string;
}> = ({ eventId, ticketPrice = 0, currency = "INR", eventTitle = "", eventDate = "" }) => {
  // Form Steps: 1 = Basic Info, 2 = Professional Details, 3 = Payment & Review
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phoneCode: "+91",
    phone: "",
    place: "",
    profession: "",
    professionOther: "",
    studentCourse: "",
    studentYear: "",
    email: "",
    referrerName: "",
    referrerCustomName: "",
    referrerPlatform: "",
    referrerPlatformOther: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      // Name validation
      if (!form.name.trim()) {
        newErrors.name = "Name is required";
      } else if (!/^[a-zA-Z\s\-']+$/.test(form.name.trim())) {
        newErrors.name = "Name can only contain letters";
      } else if (form.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      // Phone validation
      if (!form.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(form.phone)) {
        newErrors.phone = "Phone must be exactly 10 digits";
      }

      // Location validation
      if (!form.place.trim()) {
        newErrors.place = "City/State is required";
      } else if (!/^[a-zA-Z\s,\-]+$/.test(form.place.trim())) {
        newErrors.place = "City/State can only contain letters";
      } else if (form.place.trim().length < 2) {
        newErrors.place = "City/State must be at least 2 characters";
      }
    } else if (currentStep === 2) {
      // Profession validation
      if (!form.profession || !form.profession.trim()) {
        newErrors.profession = "Profession is required";
      }

      if (form.profession === "Student") {
        if (!form.studentCourse.trim()) {
          newErrors.studentCourse = "Course name is required";
        } else if (form.studentCourse.trim().length < 2) {
          newErrors.studentCourse = "Course must be at least 2 characters";
        }

        if (!form.studentYear.trim()) {
          newErrors.studentYear = "Year/Batch is required";
        } else if (form.studentYear.trim().length < 2) {
          newErrors.studentYear = "Year/Batch must be at least 2 characters";
        }
      } else if (form.profession === "Other" || form.profession === "Healthcare Professional") {
        if (form.professionOther.trim() && form.professionOther.trim().length < 2) {
          newErrors.professionOther = "Please provide valid profession details";
        }
      }

      // Referrer validation
      if (!form.referrerName) {
        newErrors.referrerName = "Please tell us who referred you";
      }
      if (form.referrerName === "Someone Else" && form.referrerCustomName.length < 2) {
        newErrors.referrerCustomName = "Please enter referrer's name";
      }
      if (!form.referrerPlatform) {
        newErrors.referrerPlatform = "Please select where you saw the post";
      }
      if (form.referrerPlatform === "Others" && !form.referrerPlatformOther.trim()) {
        newErrors.referrerPlatformOther = "Please specify where you found it";
      }
    } else if (currentStep === 3) {
      // Email validation
      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        newErrors.email = "Please enter a valid email";
      } else if (form.email.trim().length > 254) {
        newErrors.email = "Email is too long";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);

    try {
      if (!eventId) {
        alert("Event is unavailable. Please refresh and try again.");
        return;
      }

      const { createBooking, updateBookingPayment } = await import("@/lib/firebase/db-queries");
      const bookingRes = await createBooking({
        eventId: eventId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: `${form.phoneCode}${form.phone.trim()}`,
        place: form.place.trim(),
        profession:
          form.profession === "Student"
            ? `Student - ${form.studentCourse.trim()} (${form.studentYear.trim()})`
            : form.profession === "Other"
            ? form.professionOther.trim() || "Other"
            : form.profession === "Healthcare Professional" && form.professionOther.trim()
            ? `Healthcare Professional - ${form.professionOther.trim()}`
            : form.profession.trim(),
        referrerName: form.referrerName === "Someone Else" ? form.referrerCustomName.trim() : form.referrerName.trim(),
        referrerPlatform: form.referrerPlatform === "Others" ? form.referrerPlatformOther.trim() : form.referrerPlatform,
        paymentDetails: { status: "pending" },
      } as any);

      if (!bookingRes.success) throw new Error(bookingRes.error || "Booking failed");
      const bookingId = bookingRes.id as string;

      const amount = (ticketPrice ?? 0) * 100;

      if (amount > 0) {
        // Create order and show payment
        const orderResp = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, currency: currency || "INR", bookingId, eventId: eventId }),
        }).then((r) => r.json());

        if (!orderResp.success) throw new Error(orderResp.error || "Order creation failed");

        // Load Razorpay script
        await new Promise<void>((resolve, reject) => {
          if ((window as any).Razorpay) return resolve();
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Razorpay script failed to load"));
          document.body.appendChild(s);
        });

        const options = {
          key: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string) || "",
          amount: orderResp.amount,
          currency: orderResp.currency,
          order_id: orderResp.orderId,
          prefill: { name: form.name, email: form.email, contact: `${form.phoneCode}${form.phone}` },
          handler: async function (response: any) {
            setShowSuccess(true);

            const verify = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              }),
            }).then((r) => r.json());

            if (verify.success) {
              updateBookingPayment(bookingId, {
                status: "success",
                transactionId: response.razorpay_payment_id,
                amount: orderResp.amount / 100,
                currency: orderResp.currency,
              }).catch(() => {});
            } else {
              alert("Payment verification failed. Please try again.");
            }
          },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
            },
          },
        };

        const publicKey = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string) || "";
        if (!publicKey) {
          alert("Payment configuration is missing.");
          return;
        }

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Free event
        setShowSuccess(true);
        updateBookingPayment(bookingId, { status: "success", amount: 0, currency: "INR" }).catch(() => {});
      }
    } catch (err: any) {
      alert("Error: " + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  // Copy event link
  const eventUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-100">
            <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#1E1E1E] mb-2">You're All Set! 🎉</h1>
          <p className="text-gray-600 mb-8">Your registration has been confirmed. Here's what's next:</p>

          {/* Info Cards */}
          <div className="space-y-3 mb-8">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#155DFC]">📧 Check your email</span> for event details and resources
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#155DFC]">📱 WhatsApp link</span> will be sent before the event starts
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#155DFC]">📅 Add to calendar</span> to get reminders
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="w-full bg-[#155DFC] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Event With Friends
            </button>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full border-2 border-[#155DFC] text-[#155DFC] font-semibold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors"
            >
              Explore More Events
            </button>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
              <h3 className="text-xl font-bold text-[#1E1E1E] mb-4">Share Event</h3>
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
                      "_blank"
                    );
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-[#1E1E1E]">Share on LinkedIn</span>
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(`Check out this amazing event: ${eventUrl}`)}`,
                      "_blank"
                    );
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-[#1E1E1E]">Share on WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://instagram.com/?url=${encodeURIComponent(eventUrl)}`,
                      "_blank"
                    );
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-semibold text-[#1E1E1E]">Share on Instagram</span>
                </button>
              </div>

              {/* Copy Link */}
              <div className="mb-6">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Or copy event link:</p>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <span className="text-xs text-gray-700 truncate">{eventUrl.slice(0, 30)}...</span>
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                {copied && <p className="text-xs text-green-600 mt-2 font-semibold">✓ Copied!</p>}
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full border border-gray-300 text-[#1E1E1E] font-semibold py-2 px-4 rounded-full hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Form Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step >= s ? "bg-[#155DFC] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s ? "bg-[#155DFC]" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 font-semibold">
            Step {step} of 3 {step === 1 && "• Basic Information"} {step === 2 && "• Professional Details"} {step === 3 && "• Confirmation"}
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Let's Get Started 👋</h2>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s\-']*$/.test(value) || value === "") {
                      setForm({ ...form, name: value });
                      setErrors({ ...errors, name: "" });
                    }
                  }}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#155DFC] focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.phoneCode}
                    disabled
                    className="w-16 px-3 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-center font-semibold"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setForm({ ...form, phone: value });
                      setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="9876543210"
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#155DFC] focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  City / State <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={form.place}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s,\-]*$/.test(value) || value === "") {
                      setForm({ ...form, place: value });
                      setErrors({ ...errors, place: "" });
                    }
                  }}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    errors.place ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#155DFC] focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.place && <p className="text-red-500 text-sm mt-1 font-medium">{errors.place}</p>}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#155DFC] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Details */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Professional Background 💼</h2>
                <p className="text-gray-600">Help us understand your expertise</p>
              </div>

              {/* Profession Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  What's Your Profession? <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.profession}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      profession: e.target.value,
                      professionOther: "",
                      studentCourse: "",
                      studentYear: "",
                    });
                    setErrors({ ...errors, profession: "", professionOther: "", studentCourse: "", studentYear: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    errors.profession ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                  }`}
                >
                  <option value="">Select profession</option>
                  <option value="Healthcare Professional">Healthcare Professional</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
                {errors.profession && <p className="text-red-500 text-sm mt-1 font-medium">{errors.profession}</p>}
              </div>

              {/* Conditional Fields */}
              {form.profession === "Student" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                      Course Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.studentCourse}
                      onChange={(e) => {
                        setForm({ ...form, studentCourse: e.target.value });
                        setErrors({ ...errors, studentCourse: "" });
                      }}
                      placeholder="e.g., BPT, MOT"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.studentCourse ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                      }`}
                    />
                    {errors.studentCourse && <p className="text-red-500 text-sm mt-1 font-medium">{errors.studentCourse}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                      Year / Batch <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.studentYear}
                      onChange={(e) => {
                        setForm({ ...form, studentYear: e.target.value });
                        setErrors({ ...errors, studentYear: "" });
                      }}
                      placeholder="e.g., 3rd Year, 2026"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.studentYear ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                      }`}
                    />
                    {errors.studentYear && <p className="text-red-500 text-sm mt-1 font-medium">{errors.studentYear}</p>}
                  </div>
                </>
              )}

              {(form.profession === "Other" || form.profession === "Healthcare Professional") && (
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                    Specify Your Role (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.professionOther}
                    onChange={(e) => {
                      setForm({ ...form, professionOther: e.target.value });
                      setErrors({ ...errors, professionOther: "" });
                    }}
                    placeholder="e.g., Physical Therapist, Occupational Therapist"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.professionOther ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                    }`}
                  />
                  {errors.professionOther && <p className="text-red-500 text-sm mt-1 font-medium">{errors.professionOther}</p>}
                </div>
              )}

              {/* How did you find us */}
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                <label className="block text-sm font-semibold text-[#155DFC] mb-3">
                  Who Referred You? <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.referrerName}
                  onChange={(e) => {
                    setForm({ ...form, referrerName: e.target.value, referrerCustomName: "" });
                    setErrors({ ...errors, referrerName: "", referrerCustomName: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 mb-3 transition-all focus:outline-none ${
                    errors.referrerName ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                  }`}
                >
                  <option value="">Select referrer</option>
                  <option value="Vinoth">Vinoth</option>
                  <option value="Manikantan">Manikantan</option>
                  <option value="Shovan Saha">Dr. Shovan Saha</option>
                  <option value="Manoj S">Manoj S</option>
                  <option value="Nithish Kumar">Nithish Kumar</option>
                  <option value="Chaitanya">Chaitanya</option>
                  <option value="Someone Else">Someone Else</option>
                </select>
                {errors.referrerName && <p className="text-red-500 text-sm mt-1 font-medium">{errors.referrerName}</p>}

                {form.referrerName === "Someone Else" && (
                  <div>
                    <input
                      type="text"
                      value={form.referrerCustomName}
                      onChange={(e) => {
                        setForm({ ...form, referrerCustomName: e.target.value });
                        setErrors({ ...errors, referrerCustomName: "" });
                      }}
                      placeholder="Enter their name"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.referrerCustomName ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                      }`}
                    />
                    {errors.referrerCustomName && <p className="text-red-500 text-sm mt-1 font-medium">{errors.referrerCustomName}</p>}
                  </div>
                )}

                <label className="block text-sm font-semibold text-[#155DFC] mb-3 mt-4">
                  Where Did You See This? <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.referrerPlatform}
                  onChange={(e) => {
                    setForm({ ...form, referrerPlatform: e.target.value, referrerPlatformOther: "" });
                    setErrors({ ...errors, referrerPlatform: "", referrerPlatformOther: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    errors.referrerPlatform ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                  }`}
                >
                  <option value="">Select platform</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Others">Others</option>
                </select>
                {errors.referrerPlatform && <p className="text-red-500 text-sm mt-1 font-medium">{errors.referrerPlatform}</p>}

                {form.referrerPlatform === "Others" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={form.referrerPlatformOther}
                      onChange={(e) => {
                        setForm({ ...form, referrerPlatformOther: e.target.value });
                        setErrors({ ...errors, referrerPlatformOther: "" });
                      }}
                      placeholder="Please specify"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.referrerPlatformOther ? "border-red-500" : "border-gray-300 focus:border-[#155DFC]"
                      }`}
                    />
                    {errors.referrerPlatformOther && <p className="text-red-500 text-sm mt-1 font-medium">{errors.referrerPlatformOther}</p>}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-[#1E1E1E] font-semibold py-3 px-6 rounded-full hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#155DFC] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Email & Review */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Final Step ✨</h2>
                <p className="text-gray-600">Just your email address and you're done!</p>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#155DFC] focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                <p className="text-xs text-gray-600 mt-2">We'll send event details, resources & payment confirmation here</p>
                {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="font-semibold text-[#1E1E1E] mb-4">Review Your Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold text-[#1E1E1E]">{form.name || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-[#1E1E1E]">{form.phoneCode}{form.phone || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-[#1E1E1E]">{form.place || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profession:</span>
                    <span className="font-semibold text-[#1E1E1E] text-right">
                      {form.profession === "Student"
                        ? `${form.studentCourse} - ${form.studentYear}`
                        : form.profession || "-"}
                    </span>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  {ticketPrice > 0 && (
                    <div className="flex justify-between font-bold text-[#155DFC]">
                      <span>Ticket Price:</span>
                      <span>₹{ticketPrice}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center">
                By registering, you agree to receive event updates and resources via email & WhatsApp. You can unsubscribe anytime.
              </p>

              {/* Navigation */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-[#1E1E1E] font-semibold py-3 px-6 rounded-full hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 font-semibold py-3 px-6 rounded-full transition-all text-white flex items-center justify-center gap-2 ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#155DFC] hover:bg-blue-600 group"
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"></circle>
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" strokeLinecap="round"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
Register Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Add animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegistrationFormMultiStep;
