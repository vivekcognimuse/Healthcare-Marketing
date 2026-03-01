export interface Event {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  cta?: { title?: string; description?: string; buttonText?: string };
  date: string;
  time: string;
  Platform: string;
  meetLink?: string;
  whatsappLink?: string;
  capacity: number;
  attendees: number;
  tags: string[];
  imageUrl?: string;
  cardImageUrl?: string;
  speaker: { name: string; role?: string; affiliation?: string; bio?: string; photoSrc?: string };
  takeaways?: string[];
  agenda?: { time: string; title: string; desc?: string }[];
  ticketPrice?: number;
  currency?: string;
  benefits?: string[];
  certificates?: string[];
  seatLimit?: number;
}

export const events: Event[] = [
  {
    id: "sundays-with-dr-shovan-saha",
    title: "Sundays with Dr. Shovan Saha",
    tagline: "Online Session",
    description: "An Exclusive Interactive Session for OT Students, Academicians & Clinicians. Master the art of communicating Occupational Therapy with confidence and clarity.",
    date: "Sunday, March 8, 2026",
    time: "4:00 PM - 6:00 PM IST",
    Platform: "Google Meet",
    capacity: 30,
    attendees: 18,
    seatLimit: 30,
    tags: ["Occupational Therapy", "Communication", "Professional Development"],
    imageUrl: "/assets/CogniMuse.webp",
    cardImageUrl: "/assets/events/explain-ot-card.webp",
    ticketPrice: 1,
    currency: "INR",
    meetLink: "https://meet.google.com/zdf-dxqs-uwd",
    whatsappLink: "https://chat.whatsapp.com/DclOT4IDRKl50nQjI9Jyv7?mode=gi_t",
    speaker: {
      name: "Dr. Shovan Saha",
      role: "Additional Professor, Occupational Therapy",
      affiliation: "Manipal College of Health Professions",
      bio:
        "Dr. Shovan Saha is a highly respected leader in the world of Occupational Therapy with over 25 years of experience. As an Associate Professor at Manipal Academy of Higher Education, he has spent his career balancing teaching with hands-on patient care. Dr. Saha is known for his 'healing touch' and his ability to create simple, low cost tools that help people return to their daily roles.",
      photoSrc: "/assets/events/profile.png",
    },
    takeaways: [
      
    ],
    benefits: [
      "A simple 60-second OT explanation framework",
      "How to avoid hesitation while explaining",
      "How to keep people interested",
      "How to stop feeling tired of explaining OT",
      "Official E-Certificate of Participation Issued under the Sunday & Shovan Academic Series",
     
    ],
    certificates: [
      "Official E-Certificate of Participation under the Sunday & Shovan Academic Series",
    ],
    agenda: [
      { time: "4:00 PM", title: "Welcome & Introduction", desc: "Meet fellow OT professionals and set the stage" },
      { time: "4:10 PM", title: "The 60-Second Framework", desc: "Learn the exact formula for explaining OT clearly" },
      { time: "4:40 PM", title: "Live Demonstrations", desc: "See real-world examples and Q&A with Dr. Saha" },
      { time: "5:30 PM", title: "Interactive Breakout Sessions", desc: "Practice with peers and get feedback" },
      { time: "5:50 PM", title: "Closing & Certificates", desc: "Q&A and certificate distribution" },
    ],
    cta: {
      title: "Ready to Master OT Communication?",
      description: "Secure your spot in this exclusive live session. Limited to 30 seats only.",
      buttonText: "Secure Your Seat",
    },
  },
  // {
  //   id: "sundays-with-dr-shovan-saha",
  //   title: "Sundays with Dr. Shovan Saha",
  //   tagline: "WEBINAR",
  //   description: "An insightful session on simplifying and strengthening the way we communicate Occupational Therapy.",
  //   date: "Sunday, March 15, 2026",
  //   time: "11:00 AM to 12:30 PM IST",
  //   Platform: "Google Meet",
  //   capacity: 30,
  //   attendees: 0,
  //   tags: ["Occupational Therapy", "Webinar", "Communication"],
  //   imageUrl: "/assets/CogniMuse.webp",
  //   cardImageUrl: "/assets/image-1.JPG",
  //   ticketPrice: 249,
  //   meetLink: "https://meet.google.com/zdf-dxqs-uwd",
  //   currency: "INR",
  //   speaker: {
  //     name: "Dr. Shovan Saha",
  //     role: "Additional Professor, Occupational Therapy",
  //     affiliation: "Manipal College of Health Professions",
  //     bio:
  //       "Dr. Shovan Saha is a highly respected leader in the world of Occupational Therapy with over 25 years of experience. As an Associate Professor at Manipal Academy of Higher Education, he has spent his career balancing teaching with hands-on patient care. Dr. Saha is known for his 'healing touch' and his ability to create simple, low cost tools that help people return to their daily roles.",
  //     photoSrc: "/assets/events/profile.png",
  //   },
  //   takeaways: [
  //     "Clear Communication Skills: Learn how to describe Occupational Therapy in simple terms",
  //     "A Supportive Network: Connect with 500+ professionals and students",
  //     "Official Recognition: Receive a participation certificate",
  //   ],
  //   agenda: [
  //     { time: "11:00 AM", title: "Keynote Talk by Dr. Shovan Saha" },
  //     { time: "12:00 PM", title: "Break" },
  //     { time: "12:10 PM", title: "Interactive Q&A" },
  //   ],
  //   cta: {
  //     title: "",
  //     description:
  //       "Join a community of professionals for a morning of insight, connection, and growth in the field of Occupational Therapy.",
  //     buttonText: "Register Now",
  //   },
  // },
];

export default events;

