"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getEvent, createBooking, checkPhoneExistsForEvent, checkEventCapacity } from "@/lib/firebase/db-queries";
import { validatePodcastForm, type PodcastFormData, type FormErrors } from "@/lib/validation";
import { Calendar, Clock, MapPin, Globe, User, Phone, Briefcase, Hash, AlertCircle, ChevronDown, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PodcastBookingFormProps {
  eventId: string;
}

// Country codes for phone dropdown
const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
];

export default function PodcastBookingForm({ eventId }: PodcastBookingFormProps) {
  const [formData, setFormData] = useState<PodcastFormData>({
    name: "",
    email: "",
    phone: "",
    place: "",
    profession: "",
    age: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [eventError, setEventError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacityInfo, setCapacityInfo] = useState<{ available: boolean; remaining: number | null; total?: number; current?: number; error?: string } | null>(null);
  
  // Refs for cleanup and preventing race conditions
  const isMountedRef = useRef(true);
  const razorpayScriptRef = useRef<HTMLScriptElement | null>(null);
  const paymentInProgressRef = useRef(false);
  const submissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    
    const fetchEvent = async () => {
      try {
        const result = await getEvent(eventId);
        if (!isMountedRef.current) return;
        
        if (result.success && result.data) {
          const eventData = result.data;
          
          // Check if event is active
          if (!eventData.isActive) {
            setEventError("This event is no longer active.");
            setEventLoading(false);
            return;
          }
          
          // Check capacity if applicable
          if (eventData.capacity) {
            // Note: In production, you'd want to check actual bookings count
            // For now, we'll just show the capacity
          }
          
          setEvent(eventData);
          setEventError(null);
          
          // Check capacity if applicable
          if (eventData.capacity) {
            const capacityResult = await checkEventCapacity(eventId);
            if (!isMountedRef.current) return;
            setCapacityInfo(capacityResult);
            
            if (!capacityResult.available && capacityResult.remaining === 0) {
              setEventError("This event is fully booked. No more seats available.");
            }
          }
        } else {
          setEventError(result.error || "Event not found");
        }
      } catch (error) {
        if (!isMountedRef.current) return;
        console.error("Error fetching event:", error);
        setEventError("Failed to load event. Please try again.");
      } finally {
        if (isMountedRef.current) {
          setEventLoading(false);
        }
      }
    };
    
    fetchEvent();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      // Cleanup Razorpay script if exists
      if (razorpayScriptRef.current && document.body.contains(razorpayScriptRef.current)) {
        document.body.removeChild(razorpayScriptRef.current);
        razorpayScriptRef.current = null;
      }
      // Clear any pending timeouts
      if (submissionTimeoutRef.current) {
        clearTimeout(submissionTimeoutRef.current);
      }
    };
  }, [eventId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.country-dropdown-container')) {
          setShowCountryDropdown(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCountryDropdown]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmitting || loading || paymentInProgressRef.current) {
      return;
    }

    // Validate phone based on country code
    let phoneValidationError = "";
    if (!formData.phone.trim()) {
      phoneValidationError = "Phone number is required";
    } else if (countryCode === "+91") {
      // Indian phone validation
      if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        phoneValidationError = "Phone number should be 10 digits and start with 6, 7, 8, or 9";
      }
    } else {
      // International phone validation (basic)
      if (!/^\d{7,15}$/.test(formData.phone)) {
        phoneValidationError = "Please enter a valid phone number";
      }
    }

    const validationErrors = validatePodcastForm(formData);
    if (phoneValidationError) {
      validationErrors.phone = phoneValidationError;
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      setLoading(false);
      return;
    }

    // Check if event exists and is active
    if (!event || !event.isActive) {
      setErrors({ name: "This event is no longer available for booking." });
      return;
    }

    // Check capacity if applicable
    if (event.capacity && capacityInfo) {
      if (!capacityInfo.available || capacityInfo.remaining === 0) {
        setErrors({ name: "This event is fully booked. No more seats available." });
        setIsSubmitting(false);
        setLoading(false);
        return;
      }
    }

    setIsSubmitting(true);
    setLoading(true);
    setErrors({});

    try {
      // Combine country code with phone number for checking
      const fullPhoneNumber = `${countryCode}${formData.phone}`;
      const phoneCheck = await checkPhoneExistsForEvent(eventId, fullPhoneNumber);
      if (phoneCheck.exists) {
        setErrors({ phone: "This phone number is already registered for this event" });
        setIsSubmitting(false);
        setLoading(false);
        return;
      }

      // Check if event is free
      if (event.ticketPrice === 0) {
        // For free events, create booking with success status
        const bookingResult = await createBooking({
          eventId,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: `${countryCode}${formData.phone.trim()}`,
          place: formData.place.trim(),
          profession: formData.profession.trim(),
          age: parseInt(formData.age, 10),
          paymentDetails: {
            status: "success",
            amount: 0,
            currency: "INR",
          },
        });

        if (!isMountedRef.current) return;

        if (bookingResult.success && bookingResult.id) {
          // Redirect to success page for free events
          window.location.href = `/book/${eventId}/success?bookingId=${bookingResult.id}`;
        } else {
          setErrors({ name: bookingResult.error || "Failed to create booking. Please try again." });
          setIsSubmitting(false);
          setLoading(false);
        }
      } else {
        // For paid events, create booking with pending payment
        const bookingResult = await createBooking({
          eventId,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: `${countryCode}${formData.phone.trim()}`,
          place: formData.place.trim(),
          profession: formData.profession.trim(),
          age: parseInt(formData.age, 10),
          paymentDetails: {
            status: "pending",
          },
        });

        if (!isMountedRef.current) return;

        if (bookingResult.success && bookingResult.id) {
          setBookingId(bookingResult.id);
          paymentInProgressRef.current = true;
          
          // Store booking ID for payment callback (with cleanup key)
          const storageKey = `booking_${eventId}_${Date.now()}`;
          sessionStorage.setItem(storageKey, bookingResult.id);
          sessionStorage.setItem(`booking_data_${eventId}`, JSON.stringify(formData));
          
          // Trigger Razorpay payment
          initiateRazorpayPayment(bookingResult.id, storageKey);
        } else {
          setErrors({ name: bookingResult.error || "Failed to create booking. Please try again." });
          setIsSubmitting(false);
          setLoading(false);
        }
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error("Error creating booking:", error);
      setErrors({ name: "An error occurred. Please try again." });
      setIsSubmitting(false);
      setLoading(false);
    }
  }, [formData, event, eventId, isSubmitting, loading]);

  const initiateRazorpayPayment = useCallback((bookingId: string, storageKey: string) => {
    if (!event || !isMountedRef.current) {
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    // Check if Razorpay script already exists
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      createRazorpayOrder(bookingId, storageKey);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      amount: event.ticketPrice * 100, // Razorpay expects amount in paise
      currency: event.currency || "INR",
      name: event.title,
      description: `Booking for ${event.title}`,
      order_id: "", // Will be generated by server
      handler: async function (response: any) {
        if (!isMountedRef.current) return;
        
        // Verify payment on server
        try {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            // Payment verified - redirect to success page
            paymentInProgressRef.current = false;
            // Cleanup session storage
            sessionStorage.removeItem(storageKey);
            // Remove beforeunload warning before redirect
            if (beforeUnloadHandlerRef.current) {
              window.removeEventListener("beforeunload", beforeUnloadHandlerRef.current);
              beforeUnloadHandlerRef.current = null;
            }
            // Redirect without warning (using replace to avoid back button issues)
            window.location.replace(`/book/${eventId}/success?bookingId=${bookingId}&paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`);
          } else {
            throw new Error(verifyData.error || "Payment verification failed");
          }
        } catch (error) {
          if (!isMountedRef.current) return;
          console.error("Payment verification error:", error);
          paymentInProgressRef.current = false;
          setErrors({ name: "Payment verification failed. Please contact support with your booking ID." });
          setLoading(false);
          setIsSubmitting(false);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#155DFC",
      },
      modal: {
        ondismiss: function () {
          // User closed the payment modal
          if (!isMountedRef.current) return;
          paymentInProgressRef.current = false;
          setLoading(false);
          setIsSubmitting(false);
          // Optionally: mark booking as cancelled or keep as pending
        },
      },
    };

    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    
    script.onload = () => {
      if (!isMountedRef.current) return;
      createRazorpayOrder(bookingId, storageKey);
    };
    
    script.onerror = () => {
      if (!isMountedRef.current) return;
      setErrors({ name: "Failed to load payment gateway. Please check your internet connection and try again." });
      setLoading(false);
      setIsSubmitting(false);
      paymentInProgressRef.current = false;
    };
    
    razorpayScriptRef.current = script;
    document.body.appendChild(script);
  }, [event, eventId, formData]);

  const createRazorpayOrder = useCallback(async (bookingId: string, storageKey: string) => {
    if (!event || !isMountedRef.current) return;
    
    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: event.ticketPrice * 100,
          currency: event.currency || "INR",
          bookingId,
          eventId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.orderId) {
        // Get Razorpay instance
        if (typeof window !== "undefined" && (window as any).Razorpay) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
            amount: event.ticketPrice * 100,
            currency: event.currency || "INR",
            name: event.title,
            description: `Booking for ${event.title}`,
            order_id: data.orderId,
            handler: async function (response: any) {
              if (!isMountedRef.current) return;
              
              try {
                const verifyResponse = await fetch("/api/payments/verify", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    bookingId,
                  }),
                });

                const verifyData = await verifyResponse.json();
                if (verifyData.success) {
                  paymentInProgressRef.current = false;
                  sessionStorage.removeItem(storageKey);
                  // Remove beforeunload warning before redirect
                  if (beforeUnloadHandlerRef.current) {
                    window.removeEventListener("beforeunload", beforeUnloadHandlerRef.current);
                    beforeUnloadHandlerRef.current = null;
                  }
                  // Redirect without warning (using replace to avoid back button issues)
                  window.location.replace(`/book/${eventId}/success?bookingId=${bookingId}&paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`);
                } else {
                  throw new Error(verifyData.error || "Payment verification failed");
                }
              } catch (error) {
                if (!isMountedRef.current) return;
                console.error("Payment verification error:", error);
                paymentInProgressRef.current = false;
                setErrors({ name: "Payment verification failed. Please contact support." });
                setLoading(false);
                setIsSubmitting(false);
              }
            },
            prefill: {
              name: formData.name,
              contact: formData.phone,
            },
            theme: {
              color: "#155DFC",
            },
            modal: {
              ondismiss: function () {
                if (!isMountedRef.current) return;
                paymentInProgressRef.current = false;
                setLoading(false);
                setIsSubmitting(false);
              },
            },
          };
          
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          throw new Error("Razorpay SDK not loaded");
        }
      } else {
        throw new Error(data.error || "Failed to create order");
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error("Error creating order:", error);
      setErrors({ name: "Failed to initiate payment. Please try again." });
      setLoading(false);
      setIsSubmitting(false);
      paymentInProgressRef.current = false;
    }
  }, [event, eventId, formData]);

  // Store beforeunload handler reference for cleanup
  const beforeUnloadHandlerRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null);

  // Prevent browser back button during payment
  useEffect(() => {
    if (paymentInProgressRef.current) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Payment is in progress. Are you sure you want to leave?";
        return e.returnValue;
      };
      
      beforeUnloadHandlerRef.current = handleBeforeUnload;
      window.addEventListener("beforeunload", handleBeforeUnload);
      
      return () => {
        if (beforeUnloadHandlerRef.current) {
          window.removeEventListener("beforeunload", beforeUnloadHandlerRef.current);
          beforeUnloadHandlerRef.current = null;
        }
      };
    } else {
      // Remove listener when payment is not in progress
      if (beforeUnloadHandlerRef.current) {
        window.removeEventListener("beforeunload", beforeUnloadHandlerRef.current);
        beforeUnloadHandlerRef.current = null;
      }
    }
  }, [paymentInProgressRef.current]);

  if (eventLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="typography-p2 text-black/60"
          >
            Loading event details...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="typography-h2 text-black mb-4">
            {eventError === "Event not found" ? "Event Not Found" : "Event Unavailable"}
          </h1>
          <p className="typography-p2 text-black/60 mb-6">
            {eventError || "The event you're looking for doesn't exist or has been removed."}
          </p>
          <a href="/" className="btn-primary typography-btn2 px-6 py-3 inline-block">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }
      return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white py-8 px-4 pt-20 sm:pt-24 lg:pt-28 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Event Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="typography-h1 text-black mb-6"
          >
            {event.title}
          </motion.h1>
          
          {/* Event Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 shadow-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%", rotate: -45 }}
              animate={{ x: "200%", rotate: -45 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              style={{ width: "50%", height: "200%" }}
            />
            <div className="space-y-4 relative z-10">
              {/* Date and Time */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 flex-1"
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="typography-footnote text-black/60 uppercase tracking-wide">Start</span>
                      <span className="typography-p2 font-semibold text-black">
                        {formatDate(event.startDate)}
                      </span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-4 h-4 text-primary ml-2" />
                      </motion.div>
                      <span className="typography-p2 font-medium text-black">{event.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="typography-footnote text-black/60 uppercase tracking-wide">End</span>
                      <span className="typography-p2 font-semibold text-black">
                        {formatDate(event.endDate)}
                      </span>
                      <Clock className="w-4 h-4 text-primary ml-2" />
                      <span className="typography-p2 font-medium text-black">{event.endTime}</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Timezone */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg px-4 py-2.5 border border-primary/20"
                >
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="typography-footnote text-black font-medium">{event.timezone}</span>
                </motion.div>
              </div>

              {/* Location */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-3 pt-4 border-t border-black/10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <span className="typography-footnote text-black/60 uppercase tracking-wide block mb-1">Event Location</span>
                  <span className="typography-p2 font-medium text-black">{event.location}</span>
                  {event.locationType === "online" && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 typography-footnote text-primary ml-2 px-2 py-0.5 bg-primary/10 rounded-full"
                    >
                      <Globe className="w-3 h-3" />
                      Online
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              {event.description && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4 border-t border-black/10"
                >
                  <p className="typography-p2 text-black/80 whitespace-pre-line leading-relaxed">{event.description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Event Options */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 shadow-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col gap-2 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
              >
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  <span className="typography-footnote text-black/60 uppercase tracking-wide">Ticket Price</span>
                </div>
                <span className="typography-h3 font-bold text-black">
                  {event.ticketPrice === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${event.ticketPrice}`
                  )}
                </span>
              </motion.div>
              {event.capacity && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col gap-2 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="typography-footnote text-black/60 uppercase tracking-wide">Capacity</span>
                  </div>
                  <span className="typography-h3 font-bold text-black">
                    {capacityInfo && capacityInfo.remaining !== null 
                      ? (
                        <span>
                          <span className="text-primary">{capacityInfo.remaining}</span>
                          <span className="text-black/60 typography-p2"> / {event.capacity}</span>
                        </span>
                      )
                      : `${event.capacity} seats`
                    }
                  </span>
                </motion.div>
              )}
              {event.requireApproval && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col gap-2 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    <span className="typography-footnote text-black/60 uppercase tracking-wide">Approval</span>
                  </div>
                  <span className="typography-p2 font-semibold text-yellow-700">Required</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Booking Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <motion.div 
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%", rotate: -45 }}
              animate={{ x: "200%", rotate: -45 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              style={{ width: "50%", height: "200%" }}
            />
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-8 relative z-10"
            >
              <motion.div 
                className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <User className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h2 className="typography-h2 text-black">Registration Details</h2>
                <p className="typography-footnote text-black/60 mt-1">Fill in your information to complete booking</p>
              </div>
            </motion.div>
            
            <div className="space-y-6 relative z-10">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="name" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Full Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    errors.name ? "border-red-500 bg-red-50/50" : "border-black/20"
                  } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                  placeholder="Enter your full name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <label htmlFor="email" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    errors.email ? "border-red-500 bg-red-50/50" : "border-black/20"
                  } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                  placeholder="Enter your email address"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="phone" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Phone Number
                </label>
                <div className="flex gap-3">
                  {/* Country Code Dropdown */}
                  <AnimatePresence>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative country-dropdown-container"
                    >
                      <motion.button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        disabled={loading || isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 ${
                          errors.phone ? "border-red-500 bg-red-50/50" : "border-black/20"
                        } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-all min-w-[130px] shadow-sm`}
                      >
                        <span className="text-lg">{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                        <span className="font-semibold">{countryCode}</span>
                        <motion.div
                          animate={{ rotate: showCountryDropdown ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showCountryDropdown && (
                          <>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-10" 
                              onClick={() => setShowCountryDropdown(false)}
                            />
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto w-72"
                              style={{
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                              }}
                            >
                              {COUNTRY_CODES.map((country) => (
                                <motion.button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setCountryCode(country.code);
                                    setShowCountryDropdown(false);
                                    setErrors({ ...errors, phone: undefined });
                                    setFormData({ ...formData, phone: "" });
                                  }}
                                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                  className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                                    countryCode === country.code ? "bg-primary/10 font-semibold" : ""
                                  }`}
                                >
                                  <span className="text-xl">{country.flag}</span>
                                  <span className="flex-1 typography-p2 text-black">{country.country}</span>
                                  <span className="typography-p2 text-black/60 font-medium">{country.code}</span>
                                </motion.button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Phone Number Input */}
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={countryCode === "+91" ? 10 : 15}
                    disabled={loading || isSubmitting}
                    whileFocus={{ scale: 1.01 }}
                    className={`flex-1 px-4 py-3.5 rounded-xl border-2 ${
                      errors.phone ? "border-red-500 bg-red-50/50" : "border-black/20"
                    } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                    placeholder={countryCode === "+91" ? "10-digit mobile number" : "Enter phone number"}
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Place */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <label htmlFor="place" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Location
                </label>
                <motion.input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    errors.place ? "border-red-500 bg-red-50/50" : "border-black/20"
                  } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                  placeholder="Your city or location"
                />
                <AnimatePresence>
                  {errors.place && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.place}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profession */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="profession" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Profession
                </label>
                <motion.input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    errors.profession ? "border-red-500 bg-red-50/50" : "border-black/20"
                  } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                  placeholder="Your profession"
                />
                <AnimatePresence>
                  {errors.profession && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.profession}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Age */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
              >
                <label htmlFor="age" className="flex items-center gap-2 typography-p2 font-medium text-black mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Hash className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Age
                </label>
                <motion.input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  disabled={loading || isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    errors.age ? "border-red-500 bg-red-50/50" : "border-black/20"
                  } bg-white/90 backdrop-blur-sm text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                  placeholder="Your age"
                />
                <AnimatePresence>
                  {errors.age && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="typography-footnote text-red-500 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.age}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative mt-8"
            >
              <motion.button
              type="submit"
              disabled={loading || isSubmitting || paymentInProgressRef.current || !event.isActive}
              whileHover={!loading && !isSubmitting && !paymentInProgressRef.current && event.isActive ? { scale: 1.02, y: -2 } : {}}
              whileTap={!loading && !isSubmitting && !paymentInProgressRef.current && event.isActive ? { scale: 0.98 } : {}}
              className={`relative w-full py-4 px-6 rounded-xl typography-btn1 font-bold transition-all overflow-hidden ${
                loading || isSubmitting || paymentInProgressRef.current || !event.isActive
                  ? "bg-black/10 text-black/40 cursor-not-allowed"
                  : "text-white shadow-2xl"
              }`}
              style={
                !loading && !isSubmitting && !paymentInProgressRef.current && event.isActive
                  ? {
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                    }
                  : {}
              }
            >
              {/* Glossy overlay */}
              {!loading && !isSubmitting && !paymentInProgressRef.current && event.isActive && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-t-xl pointer-events-none" />
                  {/* Animated shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%", rotate: -20 }}
                    whileHover={{ x: "200%", rotate: -20 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: "50%", height: "200%" }}
                  />
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl pointer-events-none" />
                </>
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading || isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing...
                  </>
                ) : paymentInProgressRef.current ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Payment in Progress...
                  </>
                ) : event.ticketPrice === 0 ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Register for Free
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Book Now - ₹{event.ticketPrice}
                  </>
                )}
              </span>
            </motion.button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}
