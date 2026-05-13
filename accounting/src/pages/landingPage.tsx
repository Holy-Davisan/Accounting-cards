import React, { useState } from "react";
import { Chapter } from "../types";

type Props = {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string, sectionIndex?: number) => void;
  onSearch: (query: string) => void;
  onReviewRandom: () => void;
  message?: string;
};

export default function LandingPage({ chapters, onSelectChapter, onSearch, onReviewRandom, message }: Props) {
  const [query, setQuery] = useState("");
  const [selectedSections, setSelectedSections] = useState<Record<string, number>>({});

  const updateSection = (chapterId: string, sectionIndex: number) => {
    setSelectedSections((prev) => ({
      ...prev,
      [chapterId]: sectionIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 to-charcoal p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-organic bg-white p-8 shadow-organic border border-clay/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-organic-orange-500 uppercase tracking-[0.2em] font-mono">Accounting cards</p>
              <h1 className="mt-3 text-4xl font-serif font-bold tracking-tight text-charcoal">
                Explore accounting chapters, search cards, or review 20 random questions.
              </h1>
              <p className="mt-4 text-clay max-w-2xl">
                Start with a chapter, search the whole deck, or practice a random set of 20 cards. Your progress resets each session.
              </p>
            </div>
            <button
              onClick={onReviewRandom}
              className="inline-flex items-center justify-center rounded-organic bg-organic-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-organic transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Review 20 Random Cards
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="block w-full">
              <span className="sr-only">Search cards</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch(query.trim());
                  }
                }}
                className="w-full rounded-industrial border-2 border-clay/30 bg-cream px-4 py-3 text-charcoal outline-none transition-all duration-200 focus:border-organic-orange-500 focus:ring-2 focus:ring-organic-orange-300 font-sans"
                placeholder="Search cards by keyword or question text"
              />
            </label>
            <button
              onClick={() => onSearch(query.trim())}
              className="rounded-industrial bg-charcoal px-6 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-gray-800 hover:shadow-industrial active:scale-95"
            >
              Search Cards
            </button>
          </div>

          {message ? (
            <div className="mt-4 rounded-industrial border border-organic-orange-300 bg-organic-orange-50 px-4 py-3 text-organic-orange-700">
              {message}
            </div>
          ) : null}
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="group rounded-organic border-2 border-clay/20 bg-white p-6 text-left shadow-organic transition-all duration-200 hover:border-organic-orange-500 hover:shadow-lg hover:-translate-y-2 hover:bg-organic-orange-50/50"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-organic-orange-500 font-mono uppercase tracking-wide">{chapter.title}</p>
                  <p className="mt-2 text-charcoal font-sans">{chapter.description}</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-industrial bg-organic-orange-100 text-organic-orange-700 font-mono font-bold">
                  {chapter.cards.length}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {chapter.cards.length > 10 ? (
                  <div className="flex items-center justify-between gap-3 rounded-organic border border-clay/20 bg-clay/5 p-3 text-sm text-charcoal">
                    <button
                      onClick={() => {
                        const sectionCount = Math.ceil(chapter.cards.length / 10);
                        const currentSection = selectedSections[chapter.id] ?? 0;
                        const previousSection = (currentSection + sectionCount - 1) % sectionCount;
                        updateSection(chapter.id, previousSection);
                      }}
                      className="rounded-industrial border border-clay/30 bg-white px-3 py-2 font-semibold text-charcoal transition duration-200 hover:border-organic-orange-500 hover:bg-organic-orange-50 active:scale-95"
                    >
                      &lt;
                    </button>

                    <div className="flex-1 text-center font-semibold">
                      Section {(selectedSections[chapter.id] ?? 0) + 1} / {Math.ceil(chapter.cards.length / 10)}
                    </div>

                    <button
                      onClick={() => {
                        const sectionCount = Math.ceil(chapter.cards.length / 10);
                        const currentSection = selectedSections[chapter.id] ?? 0;
                        const nextSection = (currentSection + 1) % sectionCount;
                        updateSection(chapter.id, nextSection);
                      }}
                      className="rounded-industrial border border-clay/30 bg-white px-3 py-2 font-semibold text-charcoal transition duration-200 hover:border-organic-orange-500 hover:bg-organic-orange-50 active:scale-95"
                    >
                      &gt;
                    </button>
                  </div>
                ) : null}

                <button
                  onClick={() => onSelectChapter(chapter.id, selectedSections[chapter.id] ?? 0)}
                  className="w-full rounded-organic bg-organic-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95"
                >
                  Start section
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
