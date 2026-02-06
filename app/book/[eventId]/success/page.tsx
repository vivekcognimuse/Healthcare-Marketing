"use client";

import { useSearchParams, useParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { CheckCircle, ArrowLeft, Loader2, Calendar, Clock, MapPin, ExternalLink, Copy, Check, AlertCircle, Sparkles, Download, Ticket } from "lucide-react";
import { getBooking, getEvent } from "@/lib/firebase/db-queries";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, Variants } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const eventId = params.eventId as string;
  const bookingId = searchParams.get("bookingId");
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  const [booking, setBooking] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloadingTicket, setDownloadingTicket] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (bookingId && eventId) {
        try {
          const [bookingResult, eventResult] = await Promise.all([
            getBooking(bookingId),
            getEvent(eventId),
          ]);
          
          if (bookingResult.success && bookingResult.data) {
            setBooking(bookingResult.data);
          } else {
            console.error("Failed to fetch booking:", bookingResult.error);
          }
          
          if (eventResult.success && eventResult.data) {
            setEvent(eventResult.data);
            // Debug: Log event location
            console.log("Event loaded:", {
              title: eventResult.data.title,
              location: eventResult.data.location,
              locationType: eventResult.data.locationType,
            });
          } else {
            console.error("Failed to fetch event:", eventResult.error);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [bookingId, eventId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("en-US", { 
        weekday: "long", 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
      });
    } catch {
      return dateString;
    }
  };

  const isUrl = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const downloadTicket = async () => {
    if (!event || !booking || downloadingTicket) return;
    
    setDownloadingTicket(true);
    try {
      // Dynamically import html2canvas and jspdf
      const html2canvasModule = await import("html2canvas");
      const jsPDFModule = await import("jspdf");
      
      const html2canvas = html2canvasModule.default;
      const { default: jsPDF } = jsPDFModule;

      if (!ticketRef.current) {
        setDownloadingTicket(false);
        alert("Ticket template not found. Please refresh the page and try again.");
        return;
      }

      // Temporarily show and position the hidden ticket template for rendering
      const ticketElement = ticketRef.current.parentElement;
      const originalDisplay = ticketElement?.style.display;
      const originalPosition = ticketElement?.style.position;
      const originalLeft = ticketElement?.style.left;
      const originalTop = ticketElement?.style.top;
      
      if (ticketElement) {
        ticketElement.style.display = "block";
        ticketElement.style.position = "absolute";
        ticketElement.style.left = "-9999px";
        ticketElement.style.top = "0";
        ticketElement.style.width = "210mm";
        ticketElement.style.zIndex = "-1";
      }

      // Wait for the element to render properly
      await new Promise(resolve => setTimeout(resolve, 300));

      // Create ticket content as canvas
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        width: ticketRef.current.scrollWidth,
        height: ticketRef.current.scrollHeight,
        windowWidth: ticketRef.current.scrollWidth,
        windowHeight: ticketRef.current.scrollHeight,
      });

      // Restore original styles
      if (ticketElement) {
        ticketElement.style.display = originalDisplay || "none";
        ticketElement.style.position = originalPosition || "";
        ticketElement.style.left = originalLeft || "";
        ticketElement.style.top = originalTop || "";
        ticketElement.style.width = "";
        ticketElement.style.zIndex = "";
      }

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is taller than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `Ticket_${event.title.replace(/\s+/g, "_")}_${bookingId || "unknown"}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF ticket:", error);
      alert("Failed to generate PDF ticket. Please ensure html2canvas and jspdf packages are installed. Run: npm install html2canvas jspdf");
    } finally {
      setDownloadingTicket(false);
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white flex items-center justify-center pt-20 sm:pt-24 lg:pt-28"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="typography-p2 text-black/60"
          >
            Loading booking confirmation...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 pt-20 sm:pt-24 lg:pt-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%)'
      }}
    >
      {/* Animated Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
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
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-5xl relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          {/* Glossy overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
          {/* Shine effect */}
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
          {/* Success Header with animated checkmark */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.3 
            }}
            className="flex flex-col items-center mb-8"
          >
            <motion.div 
              className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: "easeOut",
              }}
            >
              {/* Glossy shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent rounded-full" />
              {/* Animated shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                initial={{ x: "-100%", rotate: -45 }}
                animate={{ x: "200%", rotate: -45 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
                style={{ width: "60%", height: "200%" }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.7,
                }}
                className="relative z-10"
              >
                <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-500"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="typography-h1 text-black mb-3 text-center"
            >
              Booking Confirmed!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="typography-p2 text-black/60 text-center max-w-md"
            >
              Your registration has been successfully completed. See details below.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {event ? (
              <motion.div 
                key="event-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 mb-8"
              >
                {/* Event Details Card */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-shadow"
                >
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="typography-h3 text-black mb-4 flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                    </motion.div>
                    Event Details
                  </motion.h2>
                  <div className="space-y-3 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="typography-p2 font-semibold text-black block mb-1">{event.title}</span>
                      {event.description && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="typography-p2 text-black/70"
                        >
                          {event.description}
                        </motion.p>
                      )}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 text-black/70"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-4 h-4" />
                      </motion.div>
                      <span className="typography-p2">
                        {formatDate(event.startDate)} at {event.startTime} - {event.endTime}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Meeting Link Card - Prominent */}
                {event.location ? (
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative bg-white/90 backdrop-blur-md border-2 border-primary/30 rounded-xl p-6 shadow-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    {/* Glossy top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 via-white/20 to-transparent rounded-t-xl pointer-events-none" />
                    {/* Animated shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: "-100%", rotate: -15 }}
                      animate={{ x: "200%", rotate: -15 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      style={{ width: "50%", height: "200%" }}
                    />
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl pointer-events-none" />
                    <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="p-2 bg-primary/10 rounded-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <MapPin className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="typography-h3 text-black">Meeting Link</h3>
                          <p className="typography-footnote text-black/60 mt-1">
                            {event.locationType === "online" ? "Join the event using this link" : "Event location"}
                          </p>
                        </div>
                      </div>
                      {isUrl(event.location) && (
                        <motion.button
                          onClick={() => copyToClipboard(event.location)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                          title="Copy link"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <Check className="w-5 h-5 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-5 h-5 text-black/60" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      )}
                    </div>
                    
                    {isUrl(event.location) ? (
                      <motion.a
                        href={event.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full px-4 py-3.5 rounded-lg typography-p2 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                        }}
                      >
                        {/* Glossy top highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-t-lg pointer-events-none" />
                        {/* Animated shine sweep */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          initial={{ x: "-100%", rotate: -20 }}
                          whileHover={{ x: "200%", rotate: -20 }}
                          transition={{ duration: 0.8 }}
                          style={{ width: "50%", height: "200%" }}
                        />
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg pointer-events-none" />
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="relative z-10"
                        >
                          <ExternalLink className="w-5 h-5 text-white drop-shadow-md" />
                        </motion.div>
                        <span className="relative z-10 text-white drop-shadow-sm">Join Meeting</span>
                      </motion.a>
                    ) : (
                      <div className="px-4 py-3.5 bg-black/5 rounded-lg">
                        <p className="typography-p2 text-black break-words">{event.location}</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={itemVariants}
                    className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6"
                  >
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="typography-p2 text-yellow-800 flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </motion.div>
                      Meeting link will be shared via email/SMS before the event.
                    </motion.p>
                  </motion.div>
                )}

                {/* Booking Details Card */}
                {booking && (
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="relative bg-black/5 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.03) 100%)',
                    }}
                  >
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-xl" />
                    {/* Subtle shine */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="typography-h3 text-black mb-4 relative z-10"
                    >
                      Your Booking Details
                    </motion.h2>
                    <div className="space-y-3 relative z-10">
                      {[
                        { label: "Name", value: booking.name },
                        { label: "Email", value: booking.email },
                        { label: "Phone", value: booking.phone },
                        ...(paymentId ? [{ label: "Payment ID", value: paymentId, isMono: true }] : []),
                        ...(orderId ? [{ label: "Order ID", value: orderId, isMono: true }] : []),
                        ...(booking.paymentDetails?.amount !== undefined 
                          ? [{ 
                              label: "Amount Paid", 
                              value: booking.paymentDetails.amount === 0 ? "Free" : `₹${booking.paymentDetails.amount}`,
                              isHighlight: true 
                            }] 
                          : [])
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className={`flex justify-between items-center ${index < 2 || (paymentId && index === 2) || (orderId && index === 3) ? 'border-b border-black/10 pb-3' : 'pt-2'}`}
                        >
                          <span className="typography-p2 text-black/60">{item.label}</span>
                          <motion.span 
                            className={`typography-p2 ${item.isMono ? 'font-mono text-primary text-sm' : 'font-semibold'} ${item.isHighlight ? 'text-black' : 'text-black'} break-all text-right`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              delay: 0.7 + index * 0.1,
                              type: "spring",
                              stiffness: 200 
                            }}
                          >
                            {item.value}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8"
              >
                <motion.p 
                  animate={{ x: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="typography-p2 text-yellow-800 flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  Event details are loading. Please refresh if this persists.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/"
                className="block btn-primary typography-p2 py-4 rounded text-center transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.div>
                  Return to Home
                </span>
              </Link>
            </motion.div>
            
            {/* Download Ticket Button */}
            {event && booking && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <button
                  onClick={downloadTicket}
                  disabled={downloadingTicket}
                  className="block w-full btn-secondary typography-btn2 py-4 rounded text-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {downloadingTicket ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-5 h-5" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Ticket
                      </>
                    )}
                  </span>
                </button>
              </motion.div>
            )}

            {event?.location && isUrl(event.location) && (
              <motion.a
                href={event.location}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary typography-p2 py-4 px-8 rounded text-center transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                  Open Meeting Link
                </span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hidden Ticket Template for PDF Generation */}
      {event && booking && (
        <div className="hidden" style={{ position: "absolute", left: "-9999px" }}>
          <div
            ref={ticketRef}
            className="bg-white p-8 mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
          >
            {/* Ticket Header */}
            <div className="text-center mb-8 pb-6 border-b-4 border-primary">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">Booking Confirmed!</h1>
              <p className="text-lg text-black/70">Your Event Ticket</p>
            </div>

            {/* Event Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Ticket className="w-6 h-6 text-primary" />
                Event Details
              </h2>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-black mb-3">{event.title}</h3>
                {event.description && (
                  <p className="text-base text-black/70 mb-4">{event.description}</p>
                )}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-black/60">Date & Time</p>
                      <p className="text-base font-semibold text-black">
                        {formatDate(event.startDate)} at {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-black/60">Location</p>
                        <p className="text-base font-semibold text-black break-words">{event.location}</p>
                        {event.locationType === "online" && (
                          <p className="text-sm text-primary mt-1">Online Event</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">Attendee Information</h2>
              <div className="bg-black/5 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-black/60 mb-1">Name</p>
                    <p className="text-base font-semibold text-black">{booking.name}</p>
                  </div>
                  {booking.email && (
                    <div>
                      <p className="text-sm text-black/60 mb-1">Email</p>
                      <p className="text-base font-semibold text-black break-words">{booking.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-black/60 mb-1">Phone</p>
                    <p className="text-base font-semibold text-black">{booking.phone}</p>
                  </div>
                  {booking.place && (
                    <div>
                      <p className="text-sm text-black/60 mb-1">Location</p>
                      <p className="text-base font-semibold text-black">{booking.place}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Meeting Link Section */}
            {event.location && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Meeting Link</h2>
                <div className="bg-white border-2 border-primary/30 rounded-xl p-6">
                  {isUrl(event.location) ? (
                    <div>
                      <p className="text-sm text-black/60 mb-2">Join the event using this link:</p>
                      <p className="text-base font-mono text-primary break-all bg-primary/5 p-3 rounded-lg">
                        {event.location}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-black">{event.location}</p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Details */}
            {booking.paymentDetails && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Payment Details</h2>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base text-black/60">Amount Paid</span>
                    <span className="text-xl font-bold text-green-700">
                      {booking.paymentDetails.amount === 0 ? "Free" : `₹${booking.paymentDetails.amount}`}
                    </span>
                  </div>
                  {paymentId && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm text-black/60">Payment ID</p>
                      <p className="text-sm font-mono text-black">{paymentId}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-black/10 text-center">
              <p className="text-sm text-black/60">Booking ID: {bookingId}</p>
              <p className="text-xs text-black/50 mt-2">
                Please keep this ticket safe. Present it at the event if required.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center pt-20 sm:pt-24 lg:pt-28">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
