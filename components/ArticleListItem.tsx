import Link from "next/link";

export default function ArticleListItem({ article }: { article: any }) {
  return (
    <article className="p-4 border rounded-xl border-gray-200">
      <Link href={`/knowledge-hub/articles/${article.id}`} className="block">
        <div className="grid grid-cols-[160px_1fr_48px] items-center gap-4">
          <div className="text-xl text-gray-500">{article.date}</div>

          <div className="flex flex-col gap-2 ml-4">
            <h4 className="typography-h4 font-semibold">
              <span className="hover:underline text-black">{article.title}</span>
            </h4>
            {article.excerpt && <p className="typography-p2 text-gray-700 mt-2">{article.excerpt}</p>}
          </div>

          <div className="flex justify-end items-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}

