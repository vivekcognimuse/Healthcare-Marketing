import Link from "next/link";

type Article = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

export default function ArticlesGrid({ articles }: { articles: Article[] }) {
  const topThree = articles.slice(0, 3);
  const first = topThree[0];
  const others = topThree.slice(1);

  return (
    <section className="container py-6 px-0">
      {/* First article: large image left, meta on right for desktop */}
      {first && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <Link href={`/knowledge-hub/articles/${first.id}`} className="md:col-span-2 block">
              <div className="w-full h-64 md:h-[30rem] overflow-hidden rounded relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={first.image} alt={first.title} className="w-full h-full object-cover " />
              </div>
            </Link>

            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-2">
              {first.tag && (
                  <div className="typography-footnote inline-block bg-gray-100 text-gray-500 px-3 py-1 ">
                    {first.tag}
                  </div>
                )}
                <div className="typography-footnote text-gray-500">{first.date}</div>
               
              </div>
              <h3 className="typography-h2 font-bold mt-3">
                <Link href={`/knowledge-hub/articles/${first.id}`} className="hover:underline">
                  {first.title}
                </Link>
              </h3>
              {first.excerpt && <p className="typography-p1 text-gray-700 mt-3">{first.excerpt}</p>}
            </div>
        </div>
      )}

      {/* Next two: side-by-side cards */}
      {others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {others.map((a) => (
            <Link key={a.id} href={`/knowledge-hub/articles/${a.id}`} className="group block border rounded overflow-hidden">
            <div className="h-56 flex items-center justify-center bg-gray-100 overflow-hidden relative">
                {/* blurred background filling the card */}
                <div
                  className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105 z-0"
                  style={{ backgroundImage: `url(${a.image})` }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} className="relative z-10 max-h-full w-auto object-contain" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                {a.tag && (
                    <div className="typography-footnote inline-block bg-gray-100 text-gray-500 px-3 py-1 ">
                      {a.tag}
                    </div>
                  )}
                  <div className="typography-footnote text-gray-500">{a.date}</div>
                 
                </div>
                <h4 className="typography-h3 font-semibold mt-2">{a.title}</h4>
                {a.excerpt && <p className="typography-p2 text-gray-700 mt-2">{a.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

