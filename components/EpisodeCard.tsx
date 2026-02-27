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

type EpisodeCardProps = {
  episode: Episode;
  type?: 'episode' | 'article';
};

export default function EpisodeCard({ episode, type = 'episode' }: EpisodeCardProps) {
  const linkPath = type === 'article' ? `/knowledge-hub/articles/${episode.id}` : `/knowledge-hub/episode/${episode.id}`;
  const buttonText = type === 'article' ? 'Read article' : 'View episode';
  return (
    <article 
      className="bg-white rounded-2xl flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 lg:p-8"
      style={{ boxShadow: '0px 4px 10px 0px #00000026' }}
    >
      <div className="w-full md:w-1/3">
        <div className="bg-gray-100 w-full h-48 md:h-56 rounded-lg overflow-hidden flex items-center justify-center">
          {episode.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={episode.image} alt={episode.title} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="text-sm text-gray-500">Image</div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
            {episode.tag && (
              <div className="typography-footnote inline-block bg-gray-200 rounded-lg text-gray-500 px-3 py-1">
                {episode.tag}
              </div>
            )}
            <div className="typography-footnote text-gray-500">{episode.date}</div>
          </div>
          <h3 className="typography-h3 font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">{episode.title}</h3>
          {episode.excerpt && <p className="typography-p2 text-gray-600 line-clamp-2 md:line-clamp-3 flex-1">{episode.excerpt}</p>}
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Link href={linkPath} className="inline-block btn-secondary px-4 py-2 text-sm md:text-base rounded-full">
            {buttonText}
          </Link>
        </div>
      </div>
    </article>
  );
}
