 "use client";
import React, { useState } from "react";
import { events } from "../../data/events";
import { Bell } from "lucide-react";
import Button from "../Button";

const CTASection: React.FC<{
  cta?: { title?: string; description?: string; buttonText?: string };
  eventId?: string;
  ticketPrice?: number;
  currency?: string;
}> = ({ cta, eventId, ticketPrice = 0, currency = "INR" }) => {
  const [showNotify, setShowNotify] = useState(false);
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", phoneCode: "+91", phone: "", place: "", profession: "", professionOther: "", studentCourse: "", studentYear: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const defaultCTA = {
    title: "Ready to Lead Differently?",
    description: "Join 40 professionals for a morning of insight, connection, and actionable growth.",
    buttonText: "Reserve My Spot",
  };
  const data = { ...defaultCTA, ...(cta || {}) };

  // Helper: parse date strings like "Sunday, March 15, 2026" and time like "11:00 AM to 12:30 PM IST"
  function parseEventDate(dateStr: string, timeStr: string, isStart: boolean): Date | null {
    try {
      const datePart = dateStr.includes(",") ? dateStr.split(",").slice(1).join(",").trim() : dateStr;
      const times = timeStr.split(/\s+to\s+|\s*-\s*/i);
      let t = isStart ? times[0] : (times[1] || times[0]);
      // Remove trailing timezone words like 'IST'
      t = t.replace(/[A-Za-z]{2,}$/i, "").trim();
      const dt = new Date(`${datePart} ${t}`);
      if (isNaN(dt.getTime())) return null;
      return dt;
    } catch (err) {
      return null;
    }
  }

  function formatDateForICS(d: Date | null) {
    if (!d) return "";
    // Use UTC ISO format without punctuation: YYYYMMDDTHHMMSSZ
    const iso = d.toISOString(); // 2026-03-15T11:00:00.000Z
    return iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  const handleReserve = () => {
    // simple placeholder - actual booking/payment will be wired later
    alert("You're in! Check your inbox for confirmation details.");
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`We'll notify ${email} if a spot opens up.`);
    setEmail("");
    setShowNotify(false);
  };

  return (
    <section className="py-10 md:py-12">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="typography-h3 font-semibold text-gray-900">{data.title}</h2>
        <p className="mt-3 typography-p2 text-gray-600">{data.description}</p>

        <Button
          variant="secondary"
          onClick={() => setShowForm(true)}
          className="mt-8 btn-secondary px-4 py-2 tracking-wide"
        >
          {data.buttonText}
        </Button>

        {/* Booking Form Modal */}
        {typeof window !== "undefined" && (
          <>

            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
                <div className="relative w-full max-w-lg mx-auto my-auto">
                  <div className="rounded overflow-hidden bg-white shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
                    <div className="bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6 md:p-8 border-b border-gray-100 flex-shrink-0">
                      <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-red-hat-display)', color: '#155DFC' }}>
                        Register Now
                      </h2>
                     
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setSubmitting(true);
                          // validate
                          const errs: Record<string, string> = {};
                          
                          // Name validation: Only letters, spaces, and hyphens
                          if (!form.name.trim()) {
                            errs.name = "Name is required";
                          } else if (!/^[a-zA-Z\s\-']+$/.test(form.name.trim())) {
                            errs.name = "Name can only contain letters, spaces, and hyphens";
                          } else if (form.name.trim().length < 2) {
                            errs.name = "Name must be at least 2 characters";
                          }
                          
                          // Phone validation: Exactly 10 digits for Indian numbers
                          if (!form.phone) {
                            errs.phone = "Phone number is required";
                          } else if (!/^\d{10}$/.test(form.phone)) {
                            errs.phone = "Indian phone number must be exactly 10 digits";
                          }
                          
                          // Location validation
                          if (!form.place.trim()) {
                            errs.place = "City/State is required";
                          } else if (!/^[a-zA-Z\s,\-]+$/.test(form.place.trim())) {
                            errs.place = "City/State can only contain letters, commas, and hyphens";
                          } else if (form.place.trim().length < 2) {
                            errs.place = "City/State must be at least 2 characters";
                          }
                          
                          // Profession validation
                          if (!form.profession || !form.profession.trim()) {
                            errs.profession = "Profession is required";
                          }
                          
                          // Conditional validations
                          if (form.profession === "Other" || form.profession === "Healthcare Professional") {
                            if (form.professionOther.trim()) {
                              if (!/^[a-zA-Z\s\-]+$/.test(form.professionOther.trim())) {
                                errs.professionOther = "Profession can only contain letters and spaces";
                              } else if (form.professionOther.trim().length < 2) {
                                errs.professionOther = "Profession must be at least 2 characters";
                              }
                            }
                          }
                          
                          if (form.profession === "Student") {
                            if (!form.studentCourse.trim()) {
                              errs.studentCourse = "Course name is required";
                            } else if (!/^[a-zA-Z0-9\s\-()]+$/.test(form.studentCourse.trim())) {
                              errs.studentCourse = "Course can only contain letters, numbers, spaces, and hyphens";
                            } else if (form.studentCourse.trim().length < 2) {
                              errs.studentCourse = "Course must be at least 2 characters";
                            }
                            
                            if (!form.studentYear.trim()) {
                              errs.studentYear = "Year/Batch is required";
                            } else if (!/^[a-zA-Z0-9\s\-()]+$/.test(form.studentYear.trim())) {
                              errs.studentYear = "Year/Batch can only contain letters, numbers, spaces, and hyphens";
                            } else if (form.studentYear.trim().length < 2) {
                              errs.studentYear = "Year/Batch must be at least 2 characters";
                            }
                          }
                          
                          // Email validation: Proper regex for email
                          if (!form.email.trim()) {
                            errs.email = "Email is required";
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
                            errs.email = "Please enter a valid email address";
                          } else if (form.email.trim().length > 254) {
                            errs.email = "Email is too long";
                          }
                          
                          setErrors(errs);
                          if (Object.keys(errs).length) {
                            setSubmitting(false);
                            return;
                          }

                          try {
                            if (!eventId) {
                              alert("Event is unavailable. Please refresh and try again.");
                              setSubmitting(false);
                              return;
                            }
                            // create booking via firebase client util
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
                              paymentDetails: { status: "pending" },
                            } as any);
                            if (!bookingRes.success) throw new Error(bookingRes.error || "Booking failed");
                            const bookingId = bookingRes.id as string;

                            const amount = (ticketPrice ?? 0) * 100;

                            if (amount > 0) {
                              // create razorpay order
                              const orderResp = await fetch("/api/payments/create-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ amount: amount, currency: currency || "INR", bookingId, eventId: eventId }),
                              }).then((r) => r.json());

                              if (!orderResp.success) throw new Error(orderResp.error || "Order creation failed");

                              // load script
                              await new Promise<void>((resolve, reject) => {
                                if ((window as any).Razorpay) return resolve();
                                const s = document.createElement("script");
                                s.src = "https://checkout.razorpay.com/v1/checkout.js";
                                s.onload = () => resolve();
                                s.onerror = () => reject(new Error("Razorpay script failed to load"));
                                document.body.appendChild(s);
                              });

                              const options = {
                                // Use the public key injected from environment (NEXT_PUBLIC_RAZORPAY_KEY_ID)
                                key: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string) || "",
                                amount: orderResp.amount,
                                currency: orderResp.currency,
                                order_id: orderResp.orderId,
                                prefill: { name: form.name, email: form.email, contact: `${form.phoneCode}${form.phone}` },
                                handler: async function (response: any) {
                                  // Optimistic UX: show success modal immediately after payment callback
                                  setShowSuccess(true);
                                  setShowForm(false);

                                  // verify
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
                                    // Update booking and fetch meet link in background (non-blocking)
                                    updateBookingPayment(bookingId, { status: "success", transactionId: response.razorpay_payment_id, amount: orderResp.amount / 100, currency: orderResp.currency }).catch(() => {});
                                    try {
                                      const ev = events.find((e: any) => e.id === eventId);
                                      if (ev?.meetLink) setMeetLink(ev.meetLink);
                                    } catch {}
                                  } else {
                                    setShowSuccess(false);
                                    setShowForm(true);
                                    alert("Payment verification failed. Please try again.");
                                  }
                                },
                                modal: { ondismiss: function () {
                                  setShowSuccess(false);
                                  setShowForm(true);
                                } },
                              };

                              // Verify public key is present and not empty (embedded from .env via NEXT_PUBLIC_*)
                              const publicKey = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string) || "";
                              if (!publicKey) {
                                alert("Payment configuration is missing. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID in your environment.");
                                setSubmitting(false);
                                return;
                              }

                              if (publicKey.startsWith("rzp_test_") && process.env.NODE_ENV === "production") {
                                // Warn in prod if test key used
                                console.warn("Using Razorpay test key in production. Set live keys in env to accept real payments.");
                              }

                              const rzp = new (window as any).Razorpay(options);
                              rzp.open();
                            } else {
                              // free event - show success modal immediately
                              setShowSuccess(true);
                              setShowForm(false);
                              // Update booking in background (non-blocking)
                              updateBookingPayment(bookingId, { status: "success", amount: 0, currency: "INR" }).catch(() => {});
                              try {
                                const ev = events.find((e: any) => e.id === eventId);
                                if (ev?.meetLink) setMeetLink(ev.meetLink);
                              } catch {}
                            }
                          } catch (err: any) {
                            alert("Error: " + (err.message || err));
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                      >
                        {/* Two-column layout for Name & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          {/* Name Field */}
                          <div>
                            <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#1E1E1E', fontWeight: '600' }}>Full Name *</label>
                            <input 
                              value={form.name} 
                              onChange={(e) => {
                                const value = e.target.value;
                                // Only allow letters, spaces, and hyphens
                                if (/^[a-zA-Z\s\-']*$/.test(value) || value === '') {
                                  setForm({ ...form, name: value });
                                }
                              }}
                              placeholder="Your name"
                              className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all" 
                              style={{ 
                                fontFamily: 'var(--font-red-hat-display)', 
                                fontSize: '16px', 
                                padding: '10px 12px', 
                                border: '1px solid #D5D5D5', 
                                borderRadius: '6px',
                                color: '#1E1E1E'
                              }}
                            />
                            {errors.name && <div style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '4px', fontWeight: '500' }}>{errors.name}</div>}
                          </div>

                          {/* Location Field */}
                          <div>
                            <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#1E1E1E', fontWeight: '600' }}>City / State *</label>
                            <input 
                              value={form.place} 
                              onChange={(e) => {
                                const value = e.target.value;
                                // Only allow letters, spaces, commas, and hyphens
                                if (/^[a-zA-Z\s,\-]*$/.test(value) || value === '') {
                                  setForm({ ...form, place: value });
                                }
                              }}
                              placeholder="e.g., Mumbai, Maharashtra"
                              className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all" 
                              style={{ 
                                fontFamily: 'var(--font-red-hat-display)', 
                                fontSize: '16px', 
                                padding: '10px 12px', 
                                border: '1px solid #D5D5D5', 
                                borderRadius: '6px',
                                color: '#1E1E1E'
                              }}
                            />
                            {errors.place && <div style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '4px', fontWeight: '500' }}>{errors.place}</div>}
                          </div>
                        </div>

                        {/* Phone Field */}
                        <div className="mb-4">
                          <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#1E1E1E', fontWeight: '600' }}>Phone Number *</label>
                          <div className="flex gap-0">
                            <div 
                              className="flex items-center justify-center font-medium" 
                              style={{ 
                                fontFamily: 'var(--font-red-hat-display)', 
                                fontSize: '15px', 
                                padding: '10px 12px', 
                                backgroundColor: '#F0F4FF',
                                border: '1px solid #D5D5D5',
                                borderRight: 'none',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                color: '#155DFC',
                                minWidth: '55px'
                              }}
                            >
                              +91
                            </div>
                            <input
                              value={form.phone}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setForm({ ...form, phone: value });
                              }}
                              inputMode="numeric"
                              placeholder="Please enter your 10 digit whatsapp number"
                              maxLength={10}
                              className="flex-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                              style={{ 
                                fontFamily: 'var(--font-red-hat-display)', 
                                fontSize: '16px', 
                                padding: '10px 12px', 
                                border: '1px solid #D5D5D5',
                                borderTopRightRadius: '6px',
                                borderBottomRightRadius: '6px',
                                color: '#1E1E1E'
                              }}
                            />
                          </div>
                          <div style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: '12px', color: '#6B7280', letterSpacing: '0.03em', marginTop: '6px', lineHeight: '1.4' }}> We'll use this to add you to our exclusive WhatsApp group with event updates and announcements</div>
                          {errors.phone && <div style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '4px', fontWeight: '500' }}>{errors.phone}</div>}
                        </div>

                        {/* Profession Field */}
                        <div className="mb-4">
                          <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#1E1E1E', fontWeight: '600' }}>Your Profession *</label>
                          <select
                            value={form.profession}
                            onChange={(e) => setForm({ ...form, profession: e.target.value })}
                            className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                            style={{ 
                              fontFamily: 'var(--font-red-hat-display)', 
                              fontSize: '16px', 
                              padding: '10px 12px', 
                              border: '1px solid #D5D5D5', 
                              borderRadius: '6px',
                              color: form.profession ? '#1E1E1E' : '#999999',
                              appearance: 'none',
                              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23155DFC\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 10px center',
                              backgroundSize: '18px',
                              paddingRight: '36px'
                            }}
                          >
                            <option value="">Select your profession</option>
                            <option value="Student">Student</option>
                            <option value="OT Professional">OT Professional</option>
                        
                            <option value="Healthcare Professional">Healthcare Professional</option>
                            <option value="Other">Other</option>
                          </select>
{errors.profession && <div style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '4px', fontWeight: '500' }}>{errors.profession}</div>}

                          {form.profession === "Student" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                              <div>
                                <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(12px, 3vw, 13px)', color: '#1E1E1E', fontWeight: '600' }}>Course *</label>
                                <input
                                  value={form.studentCourse}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[a-zA-Z0-9\s\-()]*$/.test(value) || value === '') {
                                      setForm({ ...form, studentCourse: value });
                                    }
                                  }}
                                  placeholder="e.g., BPT"
                                  className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                  style={{ 
                                    fontFamily: 'var(--font-red-hat-display)', 
                                    fontSize: '15px', 
                                    padding: '8px 10px', 
                                    border: '1px solid #D5D5D5', 
                                    borderRadius: '4px',
                                    color: '#1E1E1E'
                                  }}
                                />
                                {errors.studentCourse && <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '3px', fontWeight: '500' }}>{errors.studentCourse}</div>}
                              </div>
                              <div>
                                <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(12px, 3vw, 13px)', color: '#1E1E1E', fontWeight: '600' }}>Year / Batch *</label>
                                <input
                                  value={form.studentYear}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[a-zA-Z0-9\s\-()]*$/.test(value) || value === '') {
                                      setForm({ ...form, studentYear: value });
                                    }
                                  }}
                                  placeholder="e.g., 2024-2025"
                                  className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                  style={{ 
                                    fontFamily: 'var(--font-red-hat-display)', 
                                    fontSize: '15px', 
                                    padding: '8px 10px', 
                                    border: '1px solid #D5D5D5', 
                                    borderRadius: '4px',
                                    color: '#1E1E1E'
                                  }}
                                />
                                {errors.studentYear && <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '3px', fontWeight: '500' }}>{errors.studentYear}</div>}
                              </div>
                            </div>
                          )}

                          {form.profession === "Other" && (
                            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                              <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(12px, 3vw, 13px)', color: '#1E1E1E', fontWeight: '600' }}>Please specify</label>
                              <input
                                value={form.professionOther}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^[a-zA-Z\s\-]*$/.test(value) || value === '') {
                                    setForm({ ...form, professionOther: value });
                                  }
                                }}
                                placeholder="Tell us your profession"
                                className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                style={{ 
                                  fontFamily: 'var(--font-red-hat-display)', 
                                  fontSize: '15px', 
                                  padding: '8px 10px', 
                                  border: '1px solid #D5D5D5', 
                                  borderRadius: '4px',
                                  color: '#1E1E1E'
                                }}
                              />
                                {errors.professionOther && <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '3px', fontWeight: '500' }}>{errors.professionOther}</div>}
                            </div>
                          )}

                          {form.profession === "Healthcare Professional" && (
                            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                              <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(12px, 3vw, 13px)', color: '#1E1E1E', fontWeight: '600' }}>Please specify</label>
                              <input
                                value={form.professionOther}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^[a-zA-Z\s\-]*$/.test(value) || value === '') {
                                    setForm({ ...form, professionOther: value });
                                  }
                                }}
                                placeholder="e.g., Physiotherapist"
                                className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                style={{ 
                                  fontFamily: 'var(--font-red-hat-display)', 
                                  fontSize: '15px', 
                                  padding: '8px 10px', 
                                  border: '1px solid #D5D5D5', 
                                  borderRadius: '4px',
                                  color: '#1E1E1E'
                                }}
                              />
                                {errors.professionOther && <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '3px', fontWeight: '500' }}>{errors.professionOther}</div>}
                            </div>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                          <label className="block text-left font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#1E1E1E', fontWeight: '600' }}>Email Address *</label>
                          <input 
                            value={form.email} 
                            onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
                            placeholder="you@example.com"
                            type="email"
                            className="w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all" 
                            style={{ 
                              fontFamily: 'var(--font-red-hat-display)', 
                              fontSize: '16px', 
                              padding: '10px 12px', 
                              border: '1px solid #D5D5D5', 
                              borderRadius: '6px',
                              color: '#1E1E1E'
                            }}
                          />
                          <div style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: '12px', color: '#6B7280', letterSpacing: '0.03em', marginTop: '6px', lineHeight: '1.4' }}>We'll send payment info, event updates and resources to this email</div>
                          {errors.email && <div style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#DC2626', fontFamily: 'var(--font-red-hat-display)', marginTop: '4px', fontWeight: '500' }}>{errors.email}</div>}
                        </div>

                        {/* Payment Notice */}
                        {ticketPrice > 0 && (
                          <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <p style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#92400E', fontWeight: '600' }}>
                              💳 Secure payment of ₹{ticketPrice} via Razorpay
                            </p>
                          </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowForm(false)}
                            className="w-full sm:flex-1 transition-all duration-300 py-2"
                            style={{ 
                              borderColor: '#155DFC', 
                              color: '#155DFC',
                              backgroundColor: '#FAFAFA',
                              fontSize: '14px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#155DFC';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FAFAFA';
                              e.currentTarget.style.color = '#155DFC';
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={submitting}
                            variant="secondary"
                            className="w-full sm:flex-1 py-2"
                            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '14px' }}
                          >
                            {submitting ? (
                              <>
                                <svg className="w-3 h-3 animate-spin inline mr-1.5" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"></circle>
                                  <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" strokeLinecap="round"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              "Register & Pay"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
              <div className="relative w-full max-w-lg mx-auto">
                <div className="rounded-lg overflow-hidden bg-white shadow-2xl border border-gray-100">
                  <div className="bg-gradient-to-r from-green-50 to-white p-6 border-b border-gray-100 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center bg-green-100">
                      <svg className="w-7 h-7" fill="none" stroke="#059669" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700', color: '#155DFC', marginBottom: '4px' }}>You're All Set!</h2>
                    <p style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(14px, 3vw, 16px)', color: '#6B7280', fontWeight: '500' }}>Your registration has been confirmed</p>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <p style={{ fontFamily: 'var(--font-red-hat-display)', fontSize: 'clamp(13px, 3vw, 14px)', color: '#374151', lineHeight: '1.5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '500', textAlign: 'center' }}>
                        <img src="/assets/events/whatsapp-icon.svg" alt="WhatsApp" style={{ width: 'clamp(24px, 7vw, 32px)', height: 'clamp(24px, 7vw, 32px)', flexShrink: 0 }} />
                        <span>Join link will be sent via WhatsApp before the event.</span>
                      </p>
                    </div>

                    <div className="flex w-full pt-2">
                      <button 
                        onClick={() => { setShowSuccess(false); }} 
                        style={{ 
                          fontFamily: 'var(--font-red-hat-display)', 
                          fontSize: 'clamp(14px, 3.5vw, 16px)', 
                          fontWeight: '700',
                          padding: '10px 24px', 
                          border: 'none',
                          borderRadius: '6px',
                          background: 'linear-gradient(135deg, #00277E, #0D3796, #155DFC)',
                          color: 'white',
                          cursor: 'pointer',
                          width: '100%',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(21, 93, 252, 0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  );
};

export default CTASection;

