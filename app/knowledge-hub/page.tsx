"use client";

import EpisodeCard from "../../components/EpisodeCard";
import episodesData from "../../data/outreach/episodes.json";
import articlesData from "../../data/outreach/articles.json";
import Link from "next/link";
import EventsFooter from "@/components/event-horizon/EventsFooter";
import { useState, useRef } from "react";

type Episode = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

type Article = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tag?: string;
};

export default function KnowledgeHubPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const contentRef = useRef<HTMLElement>(null);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    // Scroll to the top of the content section
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const episodes: Episode[] = episodesData as Episode[];
  const articles: Article[] = articlesData as Article[];

  // Mix all episodes and articles for the grid (interleave for variety)
  const mixedContent: Array<(Episode | Article) & { type: 'episode' | 'article' }> = [];
  const maxLength = Math.max(episodes.length, articles.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (episodes[i]) {
      mixedContent.push({ ...episodes[i], type: 'episode' });
    }
    if (articles[i]) {
      mixedContent.push({ ...articles[i], type: 'article' });
    }
  }

  // Pagination
  const totalPages = Math.ceil(mixedContent.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mixedContent.slice(startIndex, endIndex);

  return (
    <>
    <main >
      {/* Hero / Intro */}
      <section id="knowledge-hub-hero" className="relative flex items-start  pt-24">
        <div className="container text-left py-6">
          <h1 className="typography-h1 !font-normal text-black">
            Knowledge Hub
          </h1>
          <p
            className="typography-h3 !font-medium mt-2"
            
          >
            Discover Powerful Stories, Conversations, and Insights in Occupational Therapy
          </p>
        </div>
      </section>

      {/* Content Grid with Pagination */}
      <section ref={contentRef} className="container py-8">
        <div className="mb-6">
          <h2 className="typography-h3 font-bold">Featured Content</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentItems.map((item) => {
            const isArticle = item.type === 'article';
            const linkPath = isArticle ? `/knowledge-hub/articles/${item.id}` : `/knowledge-hub/episode/${item.id}`;
            const buttonText = isArticle ? 'Read article' : 'View episode';
            
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ boxShadow: '0px 4px 10px 0px #00000026' }}
              >
                <Link href={linkPath} className="block">
                  <div className="w-full h-64 overflow-hidden bg-gray-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                  </div>
                </Link>
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {item.tag && (
                      <div className={`typography-footnote inline-block px-3 py-1 rounded-lg bg-gray-200 text-gray-500 `}>
                        {item.tag}
                      </div>
                    )}
                    <div className="typography-footnote text-gray-500">{item.date}</div>
                  </div>
                  <h3 className="typography-h3 font-bold mb-2 line-clamp-2">
                    <Link href={linkPath} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  {item.excerpt && <p className="typography-p2 text-gray-600 mb-4 line-clamp-3 flex-1">{item.excerpt}</p>}
                  <div className="mt-auto">
                    <Link href={linkPath} className="btn-secondary px-4 py-2 rounded-full">
                      {buttonText}
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
      </section>
    </main>
    <EventsFooter />
    </>
  );
}

