import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// Error logging to Firestore
const logError = async (functionName: string, error: Error, additionalInfo: Record<string, any> = {}) => {
  const errorData = {
    functionName,
    message: error.message,
    stack: error.stack,
    info: additionalInfo,
    timestamp: new Date().toISOString(),
  };
  try {
    await addDoc(collection(db, "errorLogs"), errorData);
  } catch (firestoreError: any) {
    // Silently fail if permissions are not set up yet
    // Only log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error("Error logging to Firestore:", firestoreError);
      console.error("Original error:", errorData);
    }
    // Don't throw - error logging should not break the app
  }
};

// ============ EVENT FUNCTIONS ============

export interface EventData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  location: string;
  locationType: "online" | "offline";
  ticketPrice: number;
  currency: string;
  capacity: number | null; // null means unlimited
  requireApproval: boolean;
  isActive: boolean;
  image?: string;
  gallery?: string[];
  agenda?: string;
  questions?: { id: string; label: string; required: boolean }[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createEvent = async (eventData: Omit<EventData, "createdAt" | "updatedAt">) => {
  try {
    const now = new Date().toISOString();
    const data = {
      ...eventData,
      createdAt: now,
      updatedAt: now,
    };
    const result = await addDoc(collection(db, "events"), data);
    return { success: true, id: result.id };
  } catch (error) {
    await logError("createEvent", error as Error, { eventData });
    return { success: false, error: (error as Error).message };
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } as EventData & { id: string } };
    }
    return { success: false, error: "Event not found" };
  } catch (error) {
    await logError("getEvent", error as Error, { eventId });
    return { success: false, error: (error as Error).message };
  }
};

export const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: events };
  } catch (error) {
    await logError("getAllEvents", error as Error);
    return { success: false, error: (error as Error).message, data: [] };
  }
};

export const updateEvent = async (eventId: string, updates: Partial<EventData>) => {
  try {
    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    await logError("updateEvent", error as Error, { eventId, updates });
    return { success: false, error: (error as Error).message };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return { success: true };
  } catch (error) {
    await logError("deleteEvent", error as Error, { eventId });
    return { success: false, error: (error as Error).message };
  }
};

// ============ BOOKING FUNCTIONS ============

export interface BookingData {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  place: string;
  profession: string;
  age: number;
  answers?: { questionId: string; answer: string }[];
  paymentDetails: {
    status: "pending" | "success" | "failed";
    transactionId?: string;
    amount?: number;
    currency?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
  };
  paymentTimestamp?: string;
  createdAt: string;
}

export const createBooking = async (bookingData: Omit<BookingData, "createdAt">) => {
  try {
    const data = {
      ...bookingData,
      createdAt: new Date().toISOString(),
    };
    const result = await addDoc(collection(db, "bookings"), data);
    return { success: true, id: result.id };
  } catch (error) {
    await logError("createBooking", error as Error, { bookingData });
    return { success: false, error: (error as Error).message };
  }
};

export const getBooking = async (bookingId: string) => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } as BookingData & { id: string } };
    }
    return { success: false, error: "Booking not found" };
  } catch (error) {
    await logError("getBooking", error as Error, { bookingId });
    return { success: false, error: (error as Error).message };
  }
};

export const getBookingsByEvent = async (eventId: string) => {
  try {
    const q = query(collection(db, "bookings"), where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: bookings };
  } catch (error) {
    await logError("getBookingsByEvent", error as Error, { eventId });
    return { success: false, error: (error as Error).message, data: [] };
  }
};

export const getAllBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: bookings };
  } catch (error) {
    await logError("getAllBookings", error as Error);
    return { success: false, error: (error as Error).message, data: [] };
  }
};

export const updateBookingPayment = async (
  bookingId: string,
  paymentDetails: BookingData["paymentDetails"]
) => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    await updateDoc(docRef, {
      paymentDetails,
      paymentTimestamp: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    await logError("updateBookingPayment", error as Error, { bookingId, paymentDetails });
    return { success: false, error: (error as Error).message };
  }
};

export const checkPhoneExistsForEvent = async (eventId: string, phone: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("eventId", "==", eventId),
      where("phone", "==", phone)
    );
    const querySnapshot = await getDocs(q);
    return { exists: !querySnapshot.empty, count: querySnapshot.size };
  } catch (error) {
    await logError("checkPhoneExistsForEvent", error as Error, { eventId, phone });
    return { exists: false, count: 0 };
  }
};

export const getBookingCountForEvent = async (eventId: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("eventId", "==", eventId),
      where("paymentDetails.status", "==", "success")
    );
    const querySnapshot = await getDocs(q);
    return { success: true, count: querySnapshot.size };
  } catch (error) {
    await logError("getBookingCountForEvent", error as Error, { eventId });
    return { success: false, count: 0 };
  }
};

export const checkEventCapacity = async (eventId: string): Promise<{ available: boolean; remaining: number | null; total?: number; current?: number; error?: string }> => {
  try {
    const eventResult = await getEvent(eventId);
    if (!eventResult.success || !eventResult.data) {
      return { available: false, remaining: null, error: "Event not found" };
    }

    const event = eventResult.data;
    
    // If no capacity limit, always available
    if (!event.capacity) {
      return { available: true, remaining: null };
    }

    // Get current booking count
    const bookingCountResult = await getBookingCountForEvent(eventId);
    const currentBookings = bookingCountResult.count;
    const remaining = event.capacity - currentBookings;

    return {
      available: remaining > 0,
      remaining: remaining,
      total: event.capacity,
      current: currentBookings,
    };
  } catch (error) {
    await logError("checkEventCapacity", error as Error, { eventId });
    return { available: false, remaining: null, error: "Failed to check capacity" };
  }
};
