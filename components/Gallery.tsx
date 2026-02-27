 "use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

export default function Gallery({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, idx) => (
          <button
            key={src}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className="md:col-span-1 overflow-hidden rounded-2xl group relative aspect-square bg-gray-100"
            aria-label={`Open image ${idx + 1}`}
          >
            <div
              className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105 z-0"
              style={{ backgroundImage: `url(${src})` }}
            />
            <img
              src={src}
              alt={`gallery-${idx}`}
              className={`relative z-10 w-full h-full object-cover ${idx === 1 ? "object-top" : "object-center"} transform transition-transform duration-300 group-hover:scale-105`}
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={`gallery-large-${index}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded shadow-lg"
            />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              aria-label="Close"
            >
              ✕
            </button>

            <button
              onClick={() => setIndex((index - 1 + images.length) % images.length)}
              className="absolute left-4 text-white bg-black/30 p-3 rounded-full hover:bg-black/50"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={() => setIndex((index + 1) % images.length)}
              className="absolute right-4 text-white bg-black/30 p-3 rounded-full hover:bg-black/50"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

