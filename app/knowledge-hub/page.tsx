import EpisodesGrid from "../outreach/../../components/EpisodesGrid";
import EpisodeCard from "../outreach/../../components/EpisodeCard";
import episodesData from "../outreach/../../data/outreach/episodes.json";
import Link from "next/link";

export const metadata = {
  title: "Knowledge Hub",
  description: "Knowledge Hub hero and episodes",
};

export default function KnowledgeHubPage() {
  const episodes = episodesData;
  const rest = episodes.slice(3);

  return (
    <main>
      {/* Hero */}
      <section
        id="knowledge-hub-hero"
        className="relative min-h-screen flex items-center"
        style={{
          background: "linear-gradient(180deg, #001B57 0%, #155DFC 71.32%, #FFFFFF 96.6%)",
        }}
      >
        <div className="container text-center">
          <h1 className="max-w-5xl mx-auto typography-h1 font-bold italic text-[64px] md:text-[80px] text-white">
            Occupational Therapy: Restoring Function through Science and Empathy
          </h1>
        </div>
      </section>

      {/* Episodes Grid (top 3) */}
      <EpisodesGrid episodes={episodes} />

      {/* Rest of the episodes as stacked cards */}
      <section className="container py-12">
        <div className="flex flex-col gap-6">
          {rest.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>
    </main>
  );
}

