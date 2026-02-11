import ArticlesGrid from "../../../components/ArticlesGrid";
import ArticleListItem from "../../../components/ArticleListItem";
import articlesData from "../../../data/outreach/articles.json";

export const metadata = {
  title: "Articles - Knowledge Hub",
  description: "Articles and newsletters",
};

export default function ArticlesPage() {
  const articles = articlesData;
  const topThree = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <main>
      <section className="container py-12 pt-28">
        <h1 className="typography-h2 font-bold mb-6">Latest Articles</h1>
        {/* Top-3 presentation for articles */}
        <ArticlesGrid articles={topThree} />

        {/* Rest as list */}
        <div className="mt-8">
          {rest.map((a) => (
            <ArticleListItem key={a.id} article={a} />
          ))}
        </div>
      </section>
    </main>
  );
}

