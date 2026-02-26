"use client";

import { useEffect, useState } from "react";

export default function ArticleTOC({ contentId = "article-content" }: { contentId?: string }) {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string }>>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll("h2, h3")) as HTMLElement[];
    const list = nodes.map((n, idx) => {
      if (!n.id) n.id = `heading-${idx}-${n.tagName.toLowerCase()}`;
      return { id: n.id, text: n.innerText };
    });
    setHeadings(list);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          // pick the one closest to top
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        } else if (entries.length) {
          // when nothing is intersecting (e.g. scrolled to page end), pick the heading
          // whose top is closest to the viewport top (smallest absolute top)
          const closest = entries
            .slice()
            .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
          if (closest) setActive(closest.target.id);
        }
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [contentId]);

  return (
    <nav className="sticky top-28 hidden lg:block">
      <div className="w-full">
        <p className="typography-p1 font-normal text-gray-500 mb-4" >Table of Contents</p>
        <ul className="space-y-3">
          {headings.map((h) => (
            <li key={h.id} className="relative">
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    // immediately mark as active so the link shows active state during smooth scroll
                    setActive(h.id);
                  }
                }}
                className={`block pl-4 typography-footnote transition-colors duration-200 ${
                  active === h.id
                    ? "text-[#155DFC] font-medium border-l-2 border-[#155DFC]"
                    : "text-black hover:text-[#155DFC] border-l-2 border-transparent"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

