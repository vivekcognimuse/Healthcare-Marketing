import episodesData from "../../../../data/outreach/episodes.json";
import { notFound } from "next/navigation";
import Link from "next/link";

type Episode = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
  youtubeId?: string;
  summary?: string;
  articles?: string[];
  "Key themes"?: string;
};

export default async function EpisodePage(props: any) {
  const { params } = props as { params: any };
  const episodes: Episode[] = episodesData as Episode[];
  const awaitedParams = await params;
  const episode = episodes.find((e) => e.id === awaitedParams.id);

  if (!episode) {
    notFound();
  }

  const embedUrl = episode?.youtubeId ? `https://www.youtube.com/embed/${episode.youtubeId}` : null;

  return (
    <main className="container py-12" style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}>
      <div className="mb-6">
        <Link href="/outreach" className="article-back-link typography-p2 text-gray-600 hover:underline">
          ← Back to Conversations
        </Link>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="typography-footnote text-gray-500">{episode?.date}</div>
            {episode?.tag && (
              <div className="px-2 py-1 bg-gray-100 rounded typography-footnote text-gray-700">{episode.tag}</div>
            )}
          </div>
          <h2 className="typography-h2 font-bold mt-2">{episode?.title}</h2>
        </header>

        {embedUrl && (
          <div className="mb-8">
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <div className="w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={embedUrl}
                  title={episode?.title}
                  className="w-full h-full min-h-[320px] rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {episode?.summary && (
        <section className="mb-8">
          <h2 className="typography-h2 font-semibold mb-3">Summary</h2>
          <div className="article-render max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: (() => {
                  // strip leading heading if present, keep body paragraphs as-is
                  const raw = (episode.summary || "").replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, "");
                  // do NOT convert H2 -> H3 here; keep body structure but ensure CSS maps p -> P2
                  return raw;
                })(),
              }}
            />
          </div>
        </section>
        )}
        {episode?.["Key themes"] && (
          <section className="mb-8">
            <h2 className="typography-h6 font-semibold mb-3">Key Themes</h2>
            <p className="typography-p2 text-gray-700">{episode["Key themes"]}</p>
          </section>
        )}

        {episode?.articles && episode.articles.length > 0 && (
          <section className="mb-8">
            <h3 className="typography-h6 font-semibold mb-3">Articles</h3>
            <ul className="list-disc list-inside space-y-2">
              {episode.articles.map((a, idx) => (
                <li key={idx} className="typography-p2 text-gray-700">{a}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

