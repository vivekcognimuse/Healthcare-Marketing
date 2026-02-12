import ArticlesGrid from "../../../components/ArticlesGrid";
import articlesData from "../../../data/outreach/articles.json";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Articles - Out Reach",
  description: "Articles and newsletters",
};

export default function ArticlesPage() {
  const articles = articlesData;

  return (
    <main>
      {/* Hero / Intro */}
      <section id="articles-hero" className="relative flex items-start bg-white pt-24">
        <div className="container text-left py-6">
          <h1 className="typography-h2 font-bold text-black">Articles</h1>
          <p className="typography-h3  mt-2" style={{ fontWeight: 500 }}>
          Insights and resources on Occupational Therapy
          </p>
        </div>
      </section>

      <section className="container py-12 pt-8">
        <h2 className="typography-h3 font-bold mb-4">Latest Articles</h2>
        {/* ArticlesGrid now handles all articles with pagination for 2nd row */}
        <ArticlesGrid articles={articles} />
      </section>
    <Footer />
    </main>
  );
}

