import EpisodesGrid from "../../components/EpisodesGrid";
import EpisodeCard from "../../components/EpisodeCard";
import episodesData from "../../data/outreach/episodes.json";
import Link from "next/link";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Conversations",
  description: "Out Reach hero and episodes",
};

export default function OutreachPage() {
  const episodes = episodesData;
  const rest = episodes.slice(3);

  return (
    <>
    <main>
      {/* Hero / Intro */}
      <section id="outreach-hero" className="relative flex items-start bg-white pt-24">
        <div className="container text-left py-6">
          <h1 className="typography-h2 font-bold text-black">
            Episodes
          </h1>
          <p
            className="typography-h3 mt-2"
            style={{ fontWeight: 500, letterSpacing: "2%" }}
          >
            Discover Powerful Stories and Conversations in Occupational Therapy
          </p>
        </div>
      </section>

      {/* Episodes Grid (top 3) */}
      <EpisodesGrid episodes={episodes} />

      {/* Rest of the episodes as stacked cards */}
      <section className="container py-12">
        <div className="mb-6">
          <h2 className="typography-h3 font-bold">More Episodes</h2>
        </div>
        <div className="flex flex-col gap-6">
          {rest.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}

