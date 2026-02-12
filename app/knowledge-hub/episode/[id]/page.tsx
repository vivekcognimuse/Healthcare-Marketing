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
    <main className="container py-12" style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/knowledge-hub" className="article-back-link typography-p2 text-gray-600 hover:underline">
            ← Back to Knowledge Hub
          </Link>
        </div>
        <header className="mb-4">
          <div className="typography-footnote text-gray-500">{episode.date}</div>
          <h2 className="typography-h2 font-bold mb-4">{episode.title}</h2>
        </header>
        <div className="mb-6">
          <div className="w-full h-64 md:h-96 bg-gray-100 overflow-hidden rounded">
            {episode.image ? <img src={episode.image} alt={episode.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">No image</div>}
          </div>
        </div>
        <div className="prose max-w-none article-render">
          <div
            dangerouslySetInnerHTML={{
              __html: (() => {
                const raw = (episode.summary || episode.excerpt || "").replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, "");
                return raw.replace(/<h2([^>]*)>/gi, "<h3$1>").replace(/<\/h2>/gi, "</h3>");
              })(),
            }}
          />
        </div>
      </div>
    </main>
  );
}

