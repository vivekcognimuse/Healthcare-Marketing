import ArticlesGrid from "../../../components/ArticlesGrid";
import ArticleListItem from "../../../components/ArticleListItem";
import articlesData from "../../../data/outreach/articles.json";

export const metadata = {
  title: "Articles - Out Reach",
  description: "Articles and newsletters",
};

export default function ArticlesPage() {
  const articles = articlesData;
  const topThree = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <main>
      {/* Hero / Intro */}
      <section id="articles-hero" className="relative flex items-start bg-white pt-24">
        <div className="container text-left py-6">
          <h1 className="typography-h2 font-bold text-black">Articles</h1>
          <p className="typography-p2 text-gray-700 mt-2">Explore Valuable Knowledge hub on Occupational Therapy</p>
        </div>
      </section>

      <section className="container py-12 pt-8">
        <h2 className="typography-h3 font-bold mb-4">Latest Articles</h2>
        {/* Top-3 presentation for articles */}
        <ArticlesGrid articles={topThree} />

        {/* Rest as list */}
        <div className="mt-10">
          <h3 className="typography-h4 font-semibold text-gray-900 mb-4">Other Articles</h3>
     
        <div className="mt-2">
          {rest.map((a) => (
            <ArticleListItem key={a.id} article={a} />
          ))}
        </div>
        </div>
      </section>
    </main>
  );
}

