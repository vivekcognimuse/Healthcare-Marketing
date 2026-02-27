import Image from "next/image";
import Link from "next/link";
import Gallery from "../../../components/Gallery";
import EventsFooter from "../../../components/event-horizon/EventsFooter";

export const metadata = {
  title: "Voices - Out Reach",
  description: "Get to know our featured voice",
};

export default function VoicesPage() {
  const images = [
    "/assets/gallery/1.jpg",
    "/assets/gallery/2.jpeg",
    "/assets/gallery/3.jpeg",
   
  
  ];

  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-[#03050B]">
        <div className="w-full h-auto md:h-[80vh] relative overflow-hidden">
          <div id="meet-dr-shovan" className="max-w-6xl mx-auto px-6 py-6 h-full flex flex-col justify-between relative">
            {/* Image at the top with side and top padding; image sits inside the black div */}
            <div className="pt-2 relative z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/dr saha-tint.webp"
                alt="Dr. Shovan Saha"
                className="w-full h-auto object-contain rounded"
                style={{ display: "block" }}
              />
              {/* overlay on top of image to improve contrast */}
              <div className="absolute inset-0  z-10 pointer-events-none rounded" />
            </div>

            {/* Hero text absolutely layered above image and container */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 via-50% to-black/0 flex flex-col items-center pointer-events-auto">
              <div className="max-w-6xl mx-auto px-6 py-6 text-center text-white">
                <h1 className="typography-h1 !font-normal max-w-6xl" style={{ 
                  fontFamily: "'PP Editorial New', serif",
                  letterSpacing: "-0.02em"
                }}>
                  Meet Dr. Shovan Saha
                </h1>
                <p className="mt-4 max-w-3xl mx-auto typography-h3 !font-medium  text-gray-100" style={{ 
                  fontFamily: "'Anonymous Pro', monospace"}}>
                  Bridging Science and Empathy in Occupational Therapy
                </p>

               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Bio */}
      <section className="container py-12 ">
        <div className="max-w-3xl mx-auto">
          <h2 className="typography-h3 font-semibold mb-4">About Dr. Shovan Saha</h2>
          <p className="typography-p2 text-gray-700 mb-4">
            Dr. Shovan Saha is a distinguished educator and clinician dedicated to the field of Occupational Therapy. As an Additional Professor in the Department of Occupational Therapy at the Manipal College of Health Professions (MCHP), Manipal Academy of Higher Education (MAHE), his work bridges the gap between complex medical rehabilitation and the practical needs of daily life.
          </p>

          <h3 className="typography-h3 font-semibold mt-6 mb-3">A Life Dedicated to Teaching and Healing</h3>
          <p className="typography-p2 text-gray-700 mb-4">
            In 1997, an "accidental choice" brought Dr. Saha to Manipal. After growing up in busy cities like Delhi, Kolkata, and Mumbai, he found Manipal to be a calm and quiet place where he could both teach students and treat patients. This was the exact balance he had always looked for. For over 25 years, he has made this his home, serving as a pillar of the academic community.
          </p>

          <p className="typography-p2 text-gray-700 mb-4">
          Dr. Saha explains his work in simple terms: while physical therapy focuses on human movement, occupational therapy focuses on human function. "Occupation" means work or the roles we play in life, and "therapy" refers to the treatment. His goal is to help people return to their daily lives, which could mean being able to work, eat by themselves, or even play a game.

          </p>

          <h3 className="typography-h3 font-semibold mt-4 mb-2">Learning from the Patient</h3>
          <p className="typography-p2 text-gray-700 mb-4">
            A defining moment in his career happened 20 years ago with a 14-year-old boy who had lost three limbs in an accident. Dr. Saha and his team spent days trying to build devices so the boy could eat on his own. Finally, the boy asked, "Sir, why are you so worried about my eating? My mother feeds me, and I am happy. Please help me so I can play solitaire on the computer."
          </p>
          <p className="typography-p2 text-gray-700 mb-4">
            This experience "zapped" Dr. Saha and changed how he practices. It taught him that the therapist must always ask the right questions and truly listen to what the patient wants instead of assuming they know best. He still uses this story today to teach his students about the importance of empathy and communication.
          </p>

          <h3 className="typography-h3 font-semibold mt-4 mb-2">Innovation with a "Healing Touch"</h3>
          <p className="typography-p2 text-gray-700 mb-4">
            Dr. Saha is well known for creating low-cost and effective tools to help patients. One of his most moving stories involves an office attender from Bhubaneswar who suffered a severe arm injury in a bike accident. The man’s job required him to carry a tray and serve tea, which he could no longer do. His boss suggested he become a security guard, but the man missed the social interaction of his old job.
          </p>
          <p className="typography-p2 text-gray-700 mb-4">
            He tracked down Dr. Saha on LinkedIn and traveled nearly 2,000 kilometers to Manipal. Dr. Saha created a small, simple metal device that allowed him to support the tray again. While the device looked like a small metal piece to an outsider, it meant everything to the patient because it restored his dignity and his role in society.
          </p>

          <h3 className="typography-h3 font-semibold mt-4 mb-2">Recognition and Leadership</h3>
          <p className="typography-p2 text-gray-700 mb-3">
          Dr. Saha's work has not gone unnoticed. He has received numerous awards, including the <strong> Professional Excellence Award from the All India Occupational Therapists’ Association (AIOTA)</strong>.
          </p>
          {/* <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-primary/20 mb-4">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li className="typography-p2">
                <strong>Professional Excellence Award</strong> — All India Occupational Therapists’ Association (AIOTA)
              </li>
              <li className="typography-p2">
                <strong>International Maddak Award</strong> — for innovations in assistive devices
              </li>
              <li className="typography-p2">
                <strong>Best Teacher Awards</strong> — Manipal Academy of Higher Education (MAHE)
              </li>
            </ul>
          </div> */}
          <p className="typography-p2 text-gray-700 mb-4">
            His contributions have been featured in major newspapers like <em>The Hindu</em>, <em>The Telegraph</em>, and <em>The Times of India</em>, highlighting his ability to combine high-level science with a "healing touch".
          </p>
          <p className="typography-p2 text-gray-700 mb-4">Today, Dr. Saha continues to push the boundaries of rehabilitation. He believes that even if a patient cannot afford expensive treatments, a clinician should never let them leave without trying to find an honest, affordable solution. For Dr. Saha, occupational therapy is not just about fixing a body, it is about restoring a life.</p>

          <h3 className="typography-h3 font-semibold mt-4 mb-2">A Shared Vision — CogniMuse</h3>
         
          <div className="my-8 flex justify-center bg-transparent rounded">
            <Image
              src="/assets/CogniMuse.webp"
              alt="CogniMuse"
              unoptimized
              width={360}
              height={120}
              style={{ background: "transparent" }}
              className="w-auto object-contain rounded "
            />
          </div>
          <p className="typography-p2 text-gray-700 mb-4">
          Every journey has a starting point, and for CogniMuse, that moment was in early June 2023. It has been two years and eight months since Manoj S founded this initiative with very humble beginnings. What began as a personal mission to bridge the gap between technology and human impact has grown into a specialized ecosystem. While CogniMuse delivers high-impact tech and design solutions for startups globally, it holds a deep-rooted commitment to empowering healthcare professionals. By handling the complexities of digital growth through tailored social media and marketing services, CogniMuse allows healers to focus on their patients while ensuring their life-changing expertise reaches the people who need it most.

          </p>
          <p className="typography-p2 text-gray-700 mb-4">
          The real heart of the story began in 2024, when Manoj met Dr. Shovan Saha. Manoj didn’t walk into Dr. Saha’s clinic as a collaborator or a business partner; he walked in as a patient. He was recovering from a significant hand injury and was looking for a way to get his life back to normal. What started as a standard doctor-patient interaction slowly transformed over many sessions. As they worked on the physical recovery, they began to talk. Those conversations turned into mutual respect, which grew into a deep friendship, and eventually, a shared vision for the future.

          </p>
          <p className="typography-p2 text-gray-700 mb-4">Through his own recovery, Manoj experienced the profound impact of Occupational Therapy firsthand. He realized that while almost everyone knows what physiotherapy is, very few people truly understand Occupational Therapy. Most people only hear about OT in the context of pediatrics, such as helping children with autism or ADHD, but the world of adult rehabilitation is often left in the shadows. Whether it is neuro-rehab, orthopedic recovery, or specialized hand therapy, there is a massive gap in public awareness.

</p>
<p className="typography-p2 text-gray-700 mb-4">Manoj felt a strong desire to give back to the field that helped him heal. He and Dr. Saha realized they shared a common goal: they wanted to advocate for Occupational Therapy across India. They wanted to strip away the medical jargon and make OT something that anyone can understand and access. They believe that everyone, regardless of where they live, should have the chance to benefit from these life-changing interventions.
</p>
<p className="typography-p2 text-gray-700 mb-4">This partnership has already grown into a vibrant community. Together, they have launched a series of webinars and podcasts designed to share knowledge with the public, students, and healthcare professionals. They talk about things that matter, such as how a simple, low-tech assistive device can help someone return to work, or how specific therapy can improve a person's entire quality of life.
</p>
<p className="typography-p2 text-gray-700 mb-4">This is more than just a collaboration; it is a commitment to keeping the conversation going. We are moving forward with more articles, helpful reels, and ongoing learning sessions to ensure that the "healing touch" Dr. Saha talks about reaches as many people as possible.
</p>
<p className="typography-p2 text-gray-700 mb-4">This is just the beginning.</p>

          {/* Image gallery */}
          <div className="mt-12">
         
            {/* @ts-ignore */}
            <Gallery images={images} />
          </div>
         
        </div>
      </section>

      <EventsFooter />
    </main>
  );
}

