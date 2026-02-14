import episodesData from "../../../../data/outreach/episodes.json";
import articlesData from "../../../../data/outreach/articles.json";
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/knowledge-hub" className="article-back-link typography-p2 text-gray-600 hover:underline">
            ← Back to Knowledge Hub
          </Link>
        </div>
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
          {episode?.tag && (
              <div className="px-2 py-1 bg-gray-200 rounded-lg typography-footnote text-gray-700">{episode.tag}</div>
            )}
            <div className="typography-footnote text-gray-500">{episode?.date}</div>
          </div>
          <h2 className="typography-h2 font-bold mt-2">{episode?.title}</h2>
        </header>

        {embedUrl ? (
          <div className="mb-8 relative z-0">
            <div className="w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg bg-black relative">
              <iframe
                src={embedUrl}
                title={episode?.title}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="mb-8 relative z-0">
            <div className="w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg bg-black relative">
              {/* Fallback image shown in a video-frame style */}
              <img
                src={episode?.image || "/assets/CogniMuse.webp"}
                alt={episode?.title || "Coming soon"}
                className="w-full h-full object-cover"
              />
              {/* Overlay for "Coming soon" */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/60 text-white rounded-lg px-4 py-2 flex items-center gap-3">
                  <svg className="w-6 h-6 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.023A1 1 0 008 9.023v5.954a1 1 0 001.555.832l5.197-3.023a1 1 0 000-1.664z" />
                  </svg>
                  <span className="typography-h4"> Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {episode?.summary && (
          <section className="mb-8 relative z-10">
            <h2 className="typography-h3 mb-3">Summary</h2>
            <div
              id="article-content"
              className="article-render mx-auto typography-p2"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    const raw = (episode.summary || "").replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, "");
                    // Convert any remaining H2 in the body to H3 to match article styling
                    return raw.replace(/<h2([^>]*)>/gi, "<h3$1>").replace(/<\/h2>/gi, "</h3>");
                  })(),
                }}
              />
            </div>
          </section>
        )}
        {episode?.["Key themes"] && (
          <section className="mb-8">
            <h2 className="typography-h3  mb-3">Key Themes</h2>
            <p className="typography-p2 ">{episode["Key themes"]}</p>
          </section>
        )}

        {episode?.articles && episode.articles.length > 0 && (
          <section className="mb-8">
            <h3 className="typography-h3  mb-3">Articles</h3>
            <ul className="list-disc list-inside space-y-2">
              {episode.articles.map((aid, idx) => {
                const art = (articlesData as any[]).find((x) => x.id === aid);
                return (
                  <li key={idx} className="typography-p2">
                    {art ? (
                      <Link href={`/knowledge-hub/articles/${aid}`} className="text-primary hover:underline">
                        {art.title}
                      </Link>
                    ) : (
                      aid
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

