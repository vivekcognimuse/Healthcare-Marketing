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
};

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Pagination settings
  const itemsPerPage = 4;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = articles.slice(startIndex, endIndex);
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
      <div ref={contentRef}>
        <div className={`grid grid-cols-1 gap-6 ${isSingleItem ? 'md:grid-cols-1 justify-items-center' : 'md:grid-cols-2'}`}>
            {currentItems.map((article, index) => {
              const isLastOddItem = hasOddItems && index === currentItems.length - 1;
              return (
              <div 
                key={article.id} 
                className={`bg-white rounded-2xl overflow-hidden flex flex-col ${isSingleItem ? 'w-full md:max-w-[calc(50%-0.75rem)]' : 'w-full'} ${isLastOddItem ? 'md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto' : ''}`}
                style={{ boxShadow: '0px 4px 10px 0px #00000026' }}
              >
                <Link href={`/knowledge-hub/articles/${article.id}`} className="group block">
                  <div className="h-56 bg-gray-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
                  </div>
                </Link>
                <div className="p-6 lg:p-8 flex flex-col flex-1">
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
                    <Link href={`/knowledge-hub/articles/${article.id}`} className="btn-secondary px-4 py-2 rounded-full">
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
                  className={`w-10 h-10 rounded-full typography-footnote font-semibold transition-colors ${
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
    </section>
  );
}

