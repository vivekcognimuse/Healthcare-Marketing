import EpisodesGrid from "../../../components/EpisodesGrid";
import EpisodeCard from "../../../components/EpisodeCard";
import episodesData from "../../../data/outreach/episodes.json";
import Link from "next/link";
import EventsFooter from "@/components/event-horizon/EventsFooter";

export const metadata = {
  title: "Conversations",
  description: "Out Reach hero and episodes",
};

export default function EpisodePage() {
  const episodes = episodesData;
  const rest = episodes.slice(1);

  return (
    <>
    <main className="bg-[#FCF4E">
      {/* Hero / Intro */}
      <section id="outreach-hero" className="relative flex items-start  pt-24">
        <div className="container text-left py-6">
          <h1 className="typography-h1 !font-normal text-black">
            Episodes
          </h1>
          <p
            className="typography-h3 !font-medium mt-2"
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
    <EventsFooter />
    </>
  );
}

