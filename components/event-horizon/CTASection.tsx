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
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
                <div className="relative w-full max-w-md mx-4">
                  <div className="rounded-lg overflow-hidden" style={{  background: "linear-gradient(90deg, #001B57 0%, #0D3796 50%, #155DFC 100%)", }}>
                    <div className="p-6">
                      <h3 className="typography-h3 font-semibold text-white mb-2">Register for this event</h3>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setSubmitting(true);
                          // validate
                          const errs: Record<string, string> = {};
                          if (!form.name.trim()) errs.name = "Name is required";
                          if (!/^\d{6,15}$/.test(form.phone)) errs.phone = "Enter valid phone number (6-15 digits)";
                          if (!form.place.trim()) errs.place = "Place required";
                          if (!form.profession || !form.profession.trim()) errs.profession = "Profession required";
                          // If profession is Other or Student, require additional fields
                          if (form.profession === "Other" && !form.professionOther.trim()) errs.professionOther = "Please specify profession";
                          if (form.profession === "Student") {
                            if (!form.studentCourse.trim()) errs.studentCourse = "Please provide course name";
                            if (!form.studentYear.trim()) errs.studentYear = "Please provide year/batch";
                          }
                          if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email required";
                          setErrors(errs);
                          if (Object.keys(errs).length) {
                            setSubmitting(false);
                            return;
                          }

                          try {
                            // create booking via firebase client util
                            const { createBooking, updateBookingPayment } = await import("@/lib/firebase/db-queries");
                            const bookingRes = await createBooking({
                              eventId: eventId,
                              name: form.name.trim(),
                              email: form.email.trim(),
                              phone: `${form.phoneCode}${form.phone.trim()}`,
                              place: form.place.trim(),
                              profession:
                                form.profession === "Other"
                                  ? form.professionOther.trim()
                                  : form.profession === "Student"
                                  ? `Student - ${form.studentCourse.trim()} (${form.studentYear.trim()})`
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
                                    // update booking payment locally
                                    await updateBookingPayment(bookingId, { status: "success", transactionId: response.razorpay_payment_id, amount: orderResp.amount / 100, currency: orderResp.currency });
                                    // load meet link from events data if available
                                    try {
                                      const ev = events.find((e: any) => e.id === eventId);
                                      setMeetLink(ev ? ev.meetLink || null : null);
                                    } catch {}
                                    // show success modal with meet link
                                    setShowSuccess(true);
                                    setShowForm(false);
                                  } else {
                                    alert("Payment verification failed");
                                  }
                                },
                                modal: { ondismiss: function () { /* handle dismiss */ } },
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
                              // free event - mark success
                              await updateBookingPayment(bookingId, { status: "success", amount: 0, currency: "INR" });
                              // show success modal and meet link
                              try {
                                const ev = events.find((e: any) => e.id === eventId);
                                setMeetLink(ev ? ev.meetLink || null : null);
                              } catch {}
                              setShowSuccess(true);
                              setShowForm(false);
                            }
                          } catch (err: any) {
                            alert("Error: " + (err.message || err));
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block typography-footnote text-white mb-1">Name</label>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md px-3 py-2" />
                          {errors.name && <div className="text-xs text-rose-400 mt-1">{errors.name}</div>}
                        </div>
                        <div>
                          <label className="block typography-footnote text-white mb-1">Phone number</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={form.phoneCode || "+91"}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  phoneCode: e.target.value.replace(/[^+\d]/g, "").slice(0, 5), // Limit to something reasonable for country codes
                                })
                              }
                              className="w-20 rounded-md px-3 py-2 bg-white text-black"
                              placeholder="+91"
                            />
                            <input
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="flex-1 rounded-md px-3 py-2"
                              placeholder="Enter local number"
                            />
                          </div>
                          <div className="text-xs text-gray-300 mt-2">Please provide WhatsApp number</div>
                          {errors.phone && <div className="text-xs text-rose-400 mt-1">{errors.phone}</div>}
                        </div>
                        <div>
                          <label className="block typography-footnote text-white mb-1">Place</label>
                          <input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} className="w-full rounded-md px-3 py-2" />
                          {errors.place && <div className="text-xs text-rose-400 mt-1">{errors.place}</div>}
                        </div>
                        <div>
                          <label className="block typography-footnote text-white mb-1">Profession</label>
                          <select
                            value={form.profession}
                            onChange={(e) => setForm({ ...form, profession: e.target.value })}
                            className="w-full rounded-md px-3 py-2 bg-white text-black"
                          >
                            <option value="">Select profession</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.profession && <div className="text-xs text-rose-400 mt-1">{errors.profession}</div>}

                          {form.profession === "Student" && (
                            <div className="mt-3 grid grid-cols-1 gap-3">
                              <div>
                                <label className="block typography-footnote text-white mb-1">Course</label>
                                <input
                                  value={form.studentCourse}
                                  onChange={(e) => setForm({ ...form, studentCourse: e.target.value })}
                                  className="w-full rounded-md px-3 py-2"
                                  placeholder="e.g., BPT, MSc OT"
                                />
                                {errors.studentCourse && <div className="text-xs text-rose-400 mt-1">{errors.studentCourse}</div>}
                              </div>
                              <div>
                                <label className="block typography-footnote text-white mb-1">Year / Batch</label>
                                <input
                                  value={form.studentYear}
                                  onChange={(e) => setForm({ ...form, studentYear: e.target.value })}
                                  className="w-full rounded-md px-3 py-2"
                                  placeholder="e.g., 2021 batch / 3rd year"
                                />
                                {errors.studentYear && <div className="text-xs text-rose-400 mt-1">{errors.studentYear}</div>}
                              </div>
                            </div>
                          )}

                          {form.profession === "Other" && (
                            <div className="mt-3">
                              <label className="block typography-footnote text-white mb-1">Please specify</label>
                              <input
                                value={form.professionOther}
                                onChange={(e) => setForm({ ...form, professionOther: e.target.value })}
                                className="w-full rounded-md px-3 py-2"
                                placeholder="Your profession"
                              />
                              {errors.professionOther && <div className="text-xs text-rose-400 mt-1">{errors.professionOther}</div>}
                            </div>
                          )}
                        </div>
                        <div>
                            <label className="block typography-footnote text-white mb-1">Email</label>
                          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md px-3 py-2" />
                          {errors.email && <div className="text-xs text-rose-400 mt-1">{errors.email}</div>}
                        </div>
                          <div className="flex items-center gap-3 mt-4">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={submitting}
                            className={`flex-1 rounded-full px-6 py-3 flex items-center justify-center gap-2 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            {submitting ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"></circle>
                                  <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" strokeLinecap="round"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              "Pay Now"
                            )}
                          </Button>
                          <Button type="button" variant="secondary" onClick={() => setShowForm(false)} className="flex-1 rounded-full px-6 py-3">
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {showSuccess && (
            <div className="fixed inset-0 z-60 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowSuccess(false)} />
              <div className="relative w-full max-w-md mx-4">
                <div className="rounded-xl border border-gray-800 bg-[#071032] overflow-hidden shadow-lg">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Booking confirmed</h3>
                    <p className="mb-4 text-gray-300">Booking successful — here's the event link:</p>
                    {meetLink ? (
                      <>
                        <a href={meetLink} target="_blank" rel="noreferrer" className="block text-blue-400 underline mb-4">{meetLink}</a>
                        <div className="flex gap-3 mb-4 justify-center">
                          <Button
                            variant="outline"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(meetLink);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2500);
                              } catch (err) {
                                alert("Copy failed");
                              }
                            }}
                            className="rounded-full px-4 py-2"
                          >
                            {copied ? "Copied" : "Copy link"}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className="mb-4">No meeting link available yet. We'll notify you before the event.</p>
                    )}
                    <p className="text-sm text-gray-400 mb-4">We will notify you before the event.</p>
                      <div className="flex justify-center">
                        <Button variant="secondary" onClick={() => { setShowSuccess(false); }} className="rounded-full px-4 py-2">
                          Close
                        </Button>
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

