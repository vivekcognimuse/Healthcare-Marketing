import Link from "next/link";

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
    <article className="border p-4 rounded-xl flex gap-4 border-gray-200 bg-white">
      <div className="w-1/2 md:w-1/3">
        <div className="bg-gray-100 w-full h-56 md:h-56 rounded overflow-hidden flex items-center justify-center">
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
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{episode.date}</div>
            <h3 className="typography-h3 font-semibold text-gray-900 leading-snug">{episode.title}</h3>
            <div className="mt-3">
              <span className="text-sm font-medium inline-block bg-amber-50 text-amber-800 px-3 py-1 rounded-full">{episode.tag}</span>
            </div>
          </div>
          <div className="flex-shrink-0" />
        </div>

        {episode.excerpt && <p className="typography-p2 text-gray-600 mt-3">{episode.excerpt}</p>}

        <div className="mt-4">
          <Link href={`/knowledge-hub/episode/${episode.id}`} className="btn-secondary px-4 py-2">
            View episode
          </Link>
        </div>
      </div>
    </article>
  );
}

