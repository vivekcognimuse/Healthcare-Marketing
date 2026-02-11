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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[60%_40%] items-stretch">
        <Link href={`/knowledge-hub/episode/${first.id}`} className="group block border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow">
          <div className="w-full h-64 md:h-96 overflow-hidden rounded">
            {first.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={first.image} alt={first.title} className="w-full h-full object-cover" />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">Image</div>
            )}
          </div>
        </Link>

        <div className="flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <div className="inline-block px-3 py-1 rounded bg-gray-100 text-sm text-gray-700">{first.tag}</div>
              <div className="text-sm text-gray-500">{first.date}</div>
            </div>
            <h3 className="typography-h2 font-bold mt-3">{first.title}</h3>
            {first.excerpt && <p className="typography-p2 text-gray-600 mt-3">{first.excerpt}</p>}
            <div className="mt-4">
              <Link href={`/knowledge-hub/episode/${first.id}`} className="btn-secondary px-4 py-2">
                View episode
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second row: two equal columns for episode 2 and 3 */}
  
    </section>
  );
}

