import Link from "next/link";

type Episode = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

export default function EpisodesGrid({ episodes }: { episodes: Episode[] }) {
  const topThree = episodes.slice(0, 3);
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <section className="container py-6">
      <div className="mb-6">
        <h2 className="typography-h3 font-bold">Latest Episodes</h2>
      </div>
      {/* Top row: 60% image (left) and 40% meta (right) on desktop */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[60%_40%] p-4 rounded-2xl">
        <Link href={`/knowledge-hub/episode/${first.id}`} className="group block border border-gray-200 rounded-lg overflow-hidden   h-48 md:h-64">
          <div className="w-full h-full overflow-hidden rounded-lg">
            {first.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={first.image} alt={first.title} className="w-full h-full object-cover object-[50%_40%]" />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">Image</div>
            )}
          </div>
        </Link>

        <div className="h-48 md:h-64 flex flex-col justify-between px-2">
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <div className="inline-block px-3 py-1 rounded-lg bg-gray-200 typography-footnote  text-gray-500">{first.tag}</div>
              <div className="typography-footnote text-gray-500">{first.date}</div>
            </div>
            <h3 className="typography-h3 font-bold mb-2 line-clamp-3">{first.title}</h3>
            {first.excerpt && <p className="typography-p2 text-gray-600 line-clamp-3 flex-1">{first.excerpt}</p>}
          </div>
          <div className="flex-shrink-0 pb-2.5">
            <Link href={`/knowledge-hub/episode/${first.id}`} className="btn-secondary px-4 py-2 rounded-full">
              View episode
            </Link>
          </div>
        </div>
      </div>

  
    </section>
  );
}

