import articlesData from "../../../../data/outreach/articles.json";
import ArticlesGrid from "../../../../components/ArticlesGrid";
import { notFound } from "next/navigation";
import ArticleTOC from "../../../../components/ArticleTOC";
import Link from "next/link";

// Dynamic metadata for article pages using fields from data/outreach/articles.json
export async function generateMetadata(props: any) {
  const { params } = props;
  const articles: any[] = articlesData as any[];
  const article = articles.find((a) => a.id === params.id);
  if (!article) return {};

  const title = article.metaTitle || `${article.title} | CogniMuse`;
  const description = article.metaDescription || article.excerpt || "";
  const image = article.image ? article.image : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: `https://musemarketing.web.app/knowledge-hub/articles/${article.id}`,
    },
  };
}

export default async function ArticlePage(props: any) {
  const { params } = props as { params: { id: string } };
  const articles: any[] = articlesData as any[];
  const article = articles.find((a) => a.id === params.id);
  if (!article) return notFound();

  return (
    <main className="container py-12" style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}>
      {/* Title row - left aligned */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/knowledge-hub/articles" className="article-back-link typography-p2 text-gray-600 hover:underline">
            ← Back to Articles
          </Link>
        </div>
        <h2 className="typography-h2 font-bold mb-2 text-left">{article.title}</h2>
        <div className="flex items-center gap-4 mb-6">
        <div className="px-2 py-1 bg-gray-200 rounded-lg typography-footnote text-gray-700">{(article as any).tag || "Newsletter"}</div>
          <div className="typography-footnote text-gray-500">{article.date}</div>
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
            <div
              id="article-content"
              className="article-render mx-auto max-w-[65ch] prose prose-lg text-base md:text-lg leading-relaxed text-gray-800"
            >
              {/* Optional article image (hero inside article) */}
              {article.image && (
                <div className="w-full h-56 md:h-96  overflow-hidden rounded mb-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
                </div>
              )}
              {/* Render the article body (stored as sanitized HTML in data).
                  Remove the leading H1/H2 from the stored HTML to avoid duplicating the page title
                  and ensure the visible title uses the page's H2 (typography-h2). */}
              <div
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    let raw = (article.body || "").replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, "");
                    // Convert any remaining H2 in the body to H3 to match design,
                    // leave other headings intact.
                    raw = raw.replace(/<h2([^>]*)>/gi, "<h3$1>").replace(/<\/h2>/gi, "</h3>");
                    // Ensure specific list labels are bolded in-render so content authors
                    // don't need to include <strong> in the data JSON.
                    raw = raw.replace(/<li>\s*Observe first, ask second:/g, "<li><strong>Observe first, ask second:</strong>");
                    raw = raw.replace(/<li>\s*Use visual distance:/g, "<li><strong>Use visual distance:</strong>");
                    raw = raw.replace(/<li>\s*Validate their choices:/g, "<li><strong>Validate their choices:</strong>");
                    return raw;
                  })(),
                }}
              />
            </div>
          </article>

          {/* (removed empty right gutter to avoid unnecessary DOM/space) */}
        </div>
        {/* More articles */}
        <div className="mt-12">
          <h3 className="typography-h3 font-semibold text-gray-900 mb-4">Other Articles</h3>
          <ArticlesGrid 
            articles={articlesData.filter((a) => a.id !== article.id)} 
            showFirstRow={false}
          />
        </div>
      </div>
    </main>
  );
}

