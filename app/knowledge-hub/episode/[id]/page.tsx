import episodesData from "../../../../data/outreach/episodes.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EpisodePage(props: any) {
  const { params } = props as { params: any };
  const episodes: any[] = episodesData as any[];
  const awaitedParams = await params;
  const episode = episodes.find((e) => e.id === awaitedParams.id);
  if (!episode) return notFound();

  return (
    <main className="container py-12 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/knowledge-hub" className="text-lg text-gray-600 hover:underline">
            ← Back to Knowledge Hub
          </Link>
        </div>
        <h1 className="typography-h2 font-bold mb-4">{episode.title}</h1>
        <div className="mb-6">
          <div className="w-full h-64 md:h-96 bg-gray-100 overflow-hidden rounded">
            {episode.image ? <img src={episode.image} alt={episode.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">No image</div>}
          </div>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: episode.summary || episode.excerpt || "" }} />
        </div>
      </div>
    </main>
  );
}

