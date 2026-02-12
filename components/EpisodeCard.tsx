import Link from "next/link";
import articlesData from "../data/outreach/articles.json";

type Episode = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="border p-4 rounded-xl flex gap-6 border-gray-200 bg-white items-center">
      <div className="w-1/2 md:w-1/3">
        <div className="bg-gray-100 w-full h-48 md:h-56 rounded-lg overflow-hidden flex items-center justify-center">
          {episode.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={episode.image} alt={episode.title} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="text-sm text-gray-500">Image</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
            {episode.tag && (
                <div className="typography-footnote inline-block bg-gray-100 text-gray-500 px-3 py-1">
                  {episode.tag}
                </div>
              )}
              <div className="typography-footnote text-gray-500">{episode.date}</div>
             
            </div>
            <h3 className="typography-h3 font-semibold text-gray-900 leading-tight">{episode.title}</h3>
          </div>
          <div className="flex-shrink-0" />
        </div>

        {episode.excerpt && <p className="typography-p2 text-gray-600 mt-4 max-w-prose">{episode.excerpt}</p>}
        <div className="mt-6 flex flex-col gap-3">
          

          <div>
            <Link href={`/knowledge-hub/episode/${episode.id}`} className="btn-secondary px-4 py-2">
              View episode
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

