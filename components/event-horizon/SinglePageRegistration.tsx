'use client';

import { useState } from 'react';
import { createBooking, updateBookingPayment } from '@/lib/firebase/db-queries';
import { CalendarDays, Clock, Video, MapPin, Users, CheckCircle, Share2, Copy, Calendar } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RegistrationProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  platform: string;
  ticketPrice?: number;
  currency?: string;
  seatsLeft: number;
  totalSeats: number;
  imageUrl?: string;
  meetLink?: string;
  whatsappLink?: string;
}

const professionOptions = [
  { value: '', label: 'Select your profession' },
  { value: 'Student', label: 'Student' },
  { value: 'OT Professional', label: 'OT Professional' },
  { value: 'Healthcare Professional', label: 'Healthcare Professional' },
  { value: 'Others', label: 'Others' }
];

const referrerOptions = [
  { value: '', label: 'Who referred you to this event?' },
  { value: 'Vinoth', label: 'Vinoth' },
  { value: 'Manikantan', label: 'Manikantan' },
  { value: 'Dr. Shovan Saha', label: 'Dr. Shovan Saha' },
  { value: 'Manoj S', label: 'Manoj S' },
  { value: 'Nithish Kumar', label: 'Nithish Kumar' },
  { value: 'Chaitanya', label: 'Chaitanya' }
];

const platformOptions = [
  { value: '', label: 'Where did you see this event?' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Others - Please specify', label: 'Others - Please specify' }
];

export default function SinglePageRegistration({
  eventId,
  eventTitle,
  eventDate,
  eventTime,
  platform,
  ticketPrice = 0,
  currency = 'INR',
  seatsLeft,
  totalSeats,
  imageUrl,
  meetLink,
  whatsappLink
}: RegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    profession: '',
    specialization: '',
    course: '',
    year: '',
    otherProfession: '',
    referrer: '',
    platformSeen: '',
    otherPlatform: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'Phone number is required';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) return 'Phone number must be exactly 10 digits';
    if (!/^[6-9]/.test(cleaned)) return 'Phone number must start with 6, 7, 8, or 9';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateLocation = (location: string): string => {
    if (!location.trim()) return 'Location is required';
    if (location.trim().length < 2) return 'Location must be at least 2 characters';
    return '';
  };

  const handleFieldBlur = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'location':
        error = validateLocation(value);
        break;
      case 'profession':
        error = !value ? 'Please select your profession' : '';
        break;
      case 'course':
        error = !value ? 'Course is required' : '';
        break;
      case 'year':
        error = !value ? 'Year/Batch is required' : '';
        break;
      case 'referrer':
        error = !value ? 'Please tell us how you heard about this event' : '';
        break;
      case 'platformSeen':
        error = !value ? 'Please tell us where you saw this event' : '';
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      location: validateLocation(formData.location),
      profession: !formData.profession ? 'Please select your profession' : '',
      referrer: !formData.referrer ? 'Please tell us how you heard about this event' : '',
      platformSeen: !formData.platformSeen ? 'Please tell us where you saw this event' : ''
    };

    // Conditional validation
    if ((formData.profession === 'Healthcare Professional' || formData.profession === 'OT Professional') && !formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    if (formData.profession === 'Student') {
      if (!formData.course) {
        newErrors.course = 'Course is required';
      }
      if (!formData.year) {
        newErrors.year = 'Year/Batch is required';
      }
    }
    // otherProfession is optional, no validation needed

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (bookingId: string, amountInPaise: number) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please try again.');
      return;
    }

    try {
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: currency,
          bookingId,
          eventId,
          notes: {
            eventId,
            eventTitle,
            bookingId,
            userName: formData.name,
            userEmail: formData.email
          }
        })
      });

      const orderData = await orderResponse.json();
      
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: currency,
        name: 'CogniMuse',
        description: eventTitle,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
                eventId
              })
            });

            if (!verifyResponse.ok) throw new Error('Payment verification failed');

            // Show success modal immediately after verification
            setRegistrationComplete(true);

            // Update database in background (don't await)
            updateBookingPayment(bookingId, {
              status: 'success',
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id
            }).catch(error => {
              console.error('Failed to update booking payment in background:', error);
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#EF7438'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        eventId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        place: formData.location,
        profession: formData.profession,
        paymentDetails: {
          status: (ticketPrice > 0 ? 'pending' : 'success') as 'pending' | 'success' | 'failed',
          amount: ticketPrice || 0,
          currency: currency || 'INR'
        }
      };

      const result = await createBooking(bookingData);

      if (!result.success || !result.id) {
        throw new Error(result.error || 'Failed to create booking');
      }

      const bookingId = result.id;

      if (ticketPrice > 0) {
        await handlePayment(bookingId, ticketPrice * 100);
      } else {
        setRegistrationComplete(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareEvent = (platform: 'linkedin' | 'whatsapp' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `Check out this event: ${eventTitle}`;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  const addToCalendar = () => {
    // Generate .ics file
    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventTitle}
DESCRIPTION:${eventTitle} - ${platform}
LOCATION:${platform}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    link.click();
  };

  if (registrationComplete) {
    const copyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    };

    return (
      <div >
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-2">You're Registered!</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Check your email for confirmation and event details.
          </p>
        </div>

        <div className="bg-white border border-[#EF7438] rounded-xl p-4 sm:p-5 mb-4">
          <div className="space-y-2.5 text-left text-sm">
            <div className="flex items-start gap-2">
              <CalendarDays className="w-4 h-4 text-[#EF7438] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs">Date & Time</p>
                <p className="font-semibold text-[#1E1E1E]">{eventDate} • {eventTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Video className="w-4 h-4 text-[#EF7438] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs">Platform</p>
                <p className="font-semibold text-[#1E1E1E]">{platform}</p>
              </div>
            </div>
            {meetLink && (
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                <svg className="w-4 h-4 text-[#155DFC] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h3.79z"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-xs">Meeting Link</p>
                  <a href={meetLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#155DFC] hover:underline break-all text-xs">
                    {meetLink}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-blue-800 font-medium">
            <span className="font-bold">💬 Notification:</span> We'll notify you on WhatsApp before the event starts.
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={addToCalendar}
            className="w-full bg-[#155DFC] text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm"
          >
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </button>

          <button
            onClick={() => whatsappLink ? window.open(whatsappLink, '_blank') : window.open('https://chat.whatsapp.com/', '_blank')}
            className="w-full bg-[#25D366] text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {whatsappLink ? 'Join WhatsApp Community' : 'WhatsApp Community'}
          </button>

          <button
            onClick={copyLink}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm"
          >
            <Copy className="w-4 h-4" />
            Copy Event Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col px-3 sm:px-4 lg:px-6 gap-4">
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3 flex-1">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-2 sm:p-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E] mb-1.5 sm:mb-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#155DFC] text-white flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-sm sm:text-base">Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={(e) => handleFieldBlur('name', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1 sm:gap-1.5">
                  <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium text-gray-700 text-xs sm:text-sm flex items-center">
                    +91
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleChange('phone', value);
                    }}
                    onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                    className={`flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                  inputMode="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Location (City, State) <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  onBlur={(e) => handleFieldBlur('location', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                    errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Mumbai, Maharashtra"
                />
                {errors.location && <p className="text-red-500 text-xs mt-0.5">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-2 sm:p-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E] mb-1.5 sm:mb-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#155DFC] text-white flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-sm sm:text-base">Professional Details</span>
            </h3>
            
            <div className="space-y-2">
              <div>
                <label htmlFor="profession" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Profession <span className="text-red-500">*</span>
                </label>
                <select
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => handleChange('profession', e.target.value)}
                  onBlur={(e) => handleFieldBlur('profession', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation appearance-none bg-white ${
                    errors.profession ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem', paddingRight: '2.5rem' }}
                >
                  {professionOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.profession && <p className="text-red-500 text-xs mt-0.5">{errors.profession}</p>}
              </div>

              {(formData.profession === 'Healthcare Professional' || formData.profession === 'OT Professional') && (
                <div>
                  <label htmlFor="specialization" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    onBlur={(e) => handleFieldBlur('specialization', e.target.value)}
                    className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                      errors.specialization ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Occupational Therapy, Physiotherapy"
                  />
                  {errors.specialization && <p className="text-red-500 text-xs mt-0.5">{errors.specialization}</p>}
                </div>
              )}

              {formData.profession === 'Student' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                  <div>
                    <label htmlFor="course" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="course"
                      type="text"
                      value={formData.course}
                      onChange={(e) => handleChange('course', e.target.value)}
                      onBlur={(e) => handleFieldBlur('course', e.target.value)}
                      className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                        errors.course ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., B.Sc OT, BASLP"
                    />
                    {errors.course && <p className="text-red-500 text-xs mt-0.5">{errors.course}</p>}
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                      Year / Batch <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="year"
                      type="text"
                      value={formData.year}
                      onChange={(e) => handleChange('year', e.target.value)}
                      onBlur={(e) => handleFieldBlur('year', e.target.value)}
                      className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                        errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 3rd Year, 2024-25"
                    />
                    {errors.year && <p className="text-red-500 text-xs mt-0.5">{errors.year}</p>}
                  </div>
                </div>
              )}

              {formData.profession === 'Others' && (
                <div>
                  <label htmlFor="otherProfession" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                    Please Specify (Optional)
                  </label>
                  <input
                    id="otherProfession"
                    type="text"
                    value={formData.otherProfession}
                    onChange={(e) => handleChange('otherProfession', e.target.value)}
                    onBlur={(e) => handleFieldBlur('otherProfession', e.target.value)}
                    className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation ${
                      errors.otherProfession ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Your profession"
                  />
                  {errors.otherProfession && <p className="text-red-500 text-xs mt-0.5">{errors.otherProfession}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Marketing Information */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-2 sm:p-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E] mb-1.5 sm:mb-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#155DFC] text-white flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-sm sm:text-base">Help Us Improve</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
              <div>
                <label htmlFor="referrer" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Who referred you to this event? <span className="text-red-500">*</span>
                </label>
                <select
                  id="referrer"
                  value={formData.referrer}
                  onChange={(e) => handleChange('referrer', e.target.value)}
                  onBlur={(e) => handleFieldBlur('referrer', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation appearance-none bg-white ${
                    errors.referrer ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem', paddingRight: '2.5rem' }}
                >
                  {referrerOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.referrer && <p className="text-red-500 text-xs mt-0.5">{errors.referrer}</p>}
              </div>

              <div>
                <label htmlFor="platformSeen" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                  Where did you see this event? <span className="text-red-500">*</span>
                </label>
                <select
                  id="platformSeen"
                  value={formData.platformSeen}
                  onChange={(e) => handleChange('platformSeen', e.target.value)}
                  onBlur={(e) => handleFieldBlur('platformSeen', e.target.value)}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation appearance-none bg-white ${
                    errors.platformSeen ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem', paddingRight: '2.5rem' }}
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.platformSeen && <p className="text-red-500 text-xs mt-0.5">{errors.platformSeen}</p>}
              </div>

              {formData.platformSeen === 'Others - Please specify' && (
                <div className="sm:col-span-2">
                  <label htmlFor="otherPlatform" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-0.5">
                    Please Specify (Optional)
                  </label>
                  <input
                    id="otherPlatform"
                    type="text"
                    value={formData.otherPlatform}
                    onChange={(e) => handleChange('otherPlatform', e.target.value)}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition touch-manipulation"
                    placeholder="Where did you see this event?"
                  />
                </div>
              )}
            </div>
          </div>

        </form>

        {/* Submit Button - Visible on all screens */}
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('form')?.requestSubmit();
          }}
          className="w-full bg-gradient-to-r from-[#EF7438] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#EF7438] text-white font-bold py-3 sm:py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 touch-manipulation text-sm sm:text-base flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Processing...' : 'Register Now'}
        </button>
      </div>
    );
  }
