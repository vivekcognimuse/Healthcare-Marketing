import articlesData from "../../../../data/outreach/articles.json";
import { notFound } from "next/navigation";
import ArticleTOC from "../../../../components/ArticleTOC";
import Link from "next/link";

export default async function ArticlePage(props: any) {
  const { params } = props as { params: any };
  const articles: any[] = articlesData as any[];
  const awaitedParams = await params;
  const article = articles.find((a) => a.id === awaitedParams.id);
  if (!article) return notFound();

  return (
    <main className="container py-12 pt-24">
      {/* Title row - left aligned */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/knowledge-hub/articles" className="text-lg text-gray-600 hover:underline">
            ← Back to Articles
          </Link>
        </div>
        <h1 className="typography-h1 font-bold mb-2 text-left">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div>{article.date}</div>
          <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">{(article as any).tag || "Newsletter"}</div>
        </div>

        {/* Main grid: two-column layout with centered content column (no empty right gutter) */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,900px)] gap-8">
          {/* Left gutter: TOC (right-aligned inside gutter) */}
          <aside className="hidden lg:flex lg:justify-end">
            <div className="w-56 sticky top-28 pr-6">
              <ArticleTOC contentId="article-content" />
            </div>
          </aside>

          {/* Center content column */}
          <article className="lg:col-start-2 lg:col-end-3">
            <div id="article-content" className="article-render mx-auto max-w-[65ch]">
              {/* Optional article image (hero inside article) */}
              {article.image && (
                <div className="w-full h-56 md:h-96 flex items-center justify-center bg-gray-100 overflow-hidden rounded mb-6 relative">
                  <div
                    className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105 z-0 rounded"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.image} alt={article.title} className="relative z-10 max-h-full w-auto object-contain" />
                </div>
              )}
              {/* Render the article body (stored as sanitized HTML in data) */}
              <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </div>
          </article>

          {/* (removed empty right gutter to avoid unnecessary DOM/space) */}
        </div>
      </div>
    </main>
  );
}

