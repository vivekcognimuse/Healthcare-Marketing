export interface Event {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  cta?: { title?: string; description?: string; buttonText?: string };
  date: string;
  time: string;
  location: string;
  meetLink?: string;
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
}

export const events: Event[] = [
  {
    id: "evt_001",
    title: "Sundays with Dr. Shovan Saha",
    tagline: "How to Explain OT to Anyone",
    
    date: "Sunday, March 15, 2026",
    time: "11:00 AM to 12:30 PM IST",
    location: "Online via Google-Meet (Link provided upon registration)",
    capacity: 500,
    attendees: 42,
    tags: ["Occupational Therapy", "Webinar", "Communication"],
    imageUrl: "/assets/CogniMuse.webp",
    cardImageUrl: "/assets/image-1.JPG",
    ticketPrice: 249,
    meetLink: "https://meet.google.com/zdf-dxqs-uwd",
    currency: "INR",
    speaker: {
      name: "Dr. Shovan Saha",
      role: "Additional Professor, Occupational Therapy.",
      affiliation: "Manipal College of Health Professions.",
      bio:
        "Dr. Shovan Saha is a highly respected leader in the world of Occupational Therapy with over 25 years of experience. As an Associate Professor at Manipal Academy of Higher Education, he has spent his career balancing teaching with hands-on patient care. Dr. Saha is known for his 'healing touch' and his ability to create simple, low cost tools that help people return to their daily roles.",
      photoSrc: "/assets/events/profile.png",
    },
    takeaways: [
      "Clear Communication Skills: Learn how to describe Occupational Therapy in simple terms that anyone can understand.",
      "A Supportive Network: Connect with professionals and students who share your passion for helping others.",
      "Official Recognition: Receive a participation certificate to add to your professional portfolio.",
    ],
    agenda: [
      { time: "11:00 AM", title: "Keynote Talk by Dr. Shovan Saha" },
      { time: "12:00 PM", title: "Break" },
      { time: "12:10 PM", title: "Interactive Q&A" },
    ],
    cta: {
      title: "Ready to Restore Lives Differently?",
      description:
        "Join a community of professionals for a morning of insight, connection, and growth in the field of Occupational Therapy.",
      buttonText: "REGISTER",
    },
   
  },
  
];

export default events;

