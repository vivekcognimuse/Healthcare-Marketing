"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type Article = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

type ArticlesGridProps = {
  articles: Article[];
  showFirstRow?: boolean; // Control whether to show the first row
};

export default function ArticlesGrid({ articles, showFirstRow = true }: ArticlesGridProps) {
  const first = articles[0]; // First article for row 1
  
  // Pagination for 2nd row (all remaining articles)
  const remainingArticles = articles.slice(1); // All articles after the first
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Page 1: 2 articles, Page 2+: 4 articles
  const firstPageSize = 4;
  const otherPageSize = 4;
  const itemsPerPage = currentPage === 1 ? firstPageSize : otherPageSize;
  
  const totalPages = remainingArticles.length <= firstPageSize 
    ? 1 
    : 1 + Math.ceil((remainingArticles.length - firstPageSize) / otherPageSize);
  
  const startIndex = currentPage === 1 ? 0 : firstPageSize + (currentPage - 2) * otherPageSize;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = remainingArticles.slice(startIndex, endIndex);
  const isSingleItem = currentItems.length === 1;
  const hasOddItems = currentItems.length > 1 && currentItems.length % 2 === 1;

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="container py-6 px-0">
      {/* First article: large image left, meta on right for desktop */}
      {showFirstRow && first && currentPage === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10">
            <Link href={`/knowledge-hub/articles/${first.id}`} className="md:col-span-2 block">
              <div className="w-full h-48 md:h-64 2xl:h-80 overflow-hidden rounded relative bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={first.image} alt={first.title} className="w-full h-full object-cover object-center" />
              </div>
            </Link>

            <div className="md:col-span-1 h-48 md:h-64 2xl:h-80 flex flex-col justify-between 2xl:py-2.5">
              <div className="flex-1 min-h-0 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  {first.tag && (
                    <div className="typography-footnote inline-block bg-gray-200 rounded-lg text-gray-500 px-3 py-1">
                      {first.tag}
                    </div>
                  )}
                  <div className="typography-footnote text-gray-500">{first.date}</div>
                </div>
                <h3 className="typography-h3 font-bold mb-2 2xl:mb-3 line-clamp-2">
                  <Link href={`/knowledge-hub/articles/${first.id}`} className="hover:underline">
                    {first.title}
                  </Link>
                </h3>
                {first.excerpt && <p className="typography-p2 text-gray-700 line-clamp-3 2xl:line-clamp-4 flex-1">{first.excerpt}</p>}
              </div>
              <div className="flex-shrink-0 pb-2.5 2xl:pb-0">
                <Link href={`/knowledge-hub/articles/${first.id}`} className="btn-secondary px-4 py-2">
                  Read article
                </Link>
              </div>
            </div>
        </div>
      )}

      {/* Paginated 2nd row (all remaining articles) */}
      {remainingArticles.length > 0 && (
        <div ref={contentRef} className={showFirstRow && currentPage === 1 ? "mt-6" : ""}>
          <div className={`grid grid-cols-1 gap-6 ${isSingleItem ? 'md:grid-cols-1 justify-items-center' : 'md:grid-cols-2'}`}>
            {currentItems.map((article, index) => {
              const isLastOddItem = hasOddItems && index === currentItems.length - 1;
              return (
              <div key={article.id} className={`border rounded overflow-hidden flex flex-col ${isSingleItem ? 'w-full md:max-w-[calc(50%-0.75rem)]' : 'w-full'} ${isLastOddItem ? 'md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto' : ''}`}>
                <Link href={`/knowledge-hub/articles/${article.id}`} className="group block">
                  <div className="h-56 bg-gray-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {article.tag && (
                      <div className="typography-footnote inline-block bg-gray-200 rounded-lg text-gray-500 px-3 py-1">
                        {article.tag}
                      </div>
                    )}
                    <div className="typography-footnote text-gray-500">{article.date}</div>
                  </div>
                  <h4 className="typography-h3 font-semibold mb-2 line-clamp-2">
                    <Link href={`/knowledge-hub/articles/${article.id}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h4>
                  {article.excerpt && <p className="typography-p2 text-gray-700 mb-4 line-clamp-2 flex-1">{article.excerpt}</p>}
                  <div className="mt-auto">
                    <Link href={`/knowledge-hub/articles/${article.id}`} className="btn-secondary px-4 py-2">
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-md typography-footnote font-semibold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#155DFC] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

