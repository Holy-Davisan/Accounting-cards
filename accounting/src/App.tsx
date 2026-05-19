import React, { useMemo, useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import LandingPage from "./pages/landingPage";
import FlashcardPage from "./pages/flashcardPage";
import AiPage from "./pages/aiPage";
import { chapters } from "./data";
import { Card, Chapter } from "./types";

function shuffleCards(cards: Card[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function searchCards(chapters: Chapter[], query: string) {
  const normalized = query.trim().toLowerCase();
  const allCards = chapters.flatMap((chapter) => chapter.cards);

  return allCards.filter((card) => {
    const question = card.q.toLowerCase();
    const options = card.o.join(" ").toLowerCase();
    return question.includes(normalized) || options.includes(normalized);
  });
}

function getRandomCards(chapters: Chapter[], count: number) {
  const allCards = chapters.flatMap((chapter) => chapter.cards);
  return shuffleCards(allCards).slice(0, Math.min(count, allCards.length));
}

export default function App() {
  const [activeCards, setActiveCards] = useState<Card[]>([]);
  const [activeTitle, setActiveTitle] = useState("");
  const [page, setPage] = useState<"landing" | "flashcards" | "ai">("landing");
  const [message, setMessage] = useState("");

  const allChapters = useMemo(() => chapters, []);

  const handleSelectChapter = (chapterId: string, sectionIndex = 0) => {
    const chapter = allChapters.find((entry) => entry.id === chapterId);
    if (!chapter) return;

    const sectionStart = sectionIndex * 10;
    const sectionCards = chapter.cards.slice(sectionStart, sectionStart + 10);
    const sectionLabel = sectionIndex > 0 ? ` — Section ${sectionIndex + 1}` : "";

    setActiveCards(sectionCards);
    setActiveTitle(`${chapter.title}${sectionLabel}`);
    setMessage("");
    setPage("flashcards");
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setMessage("Please enter a search term before searching.");
      return;
    }

    const results = searchCards(allChapters, query);
    if (results.length === 0) {
      setMessage(`No cards matched "${query}".`);
      return;
    }

    setActiveCards(results);
    setActiveTitle(`Search results for "${query}"`);
    setMessage("");
    setPage("flashcards");
  };

  const handleReviewRandom = () => {
    const randomCards = getRandomCards(allChapters, 20);
    setActiveCards(randomCards);
    setActiveTitle("20 Random Cards");
    setMessage("");
    setPage("flashcards");
  };

  const handleReturnHome = () => {
    setPage("landing");
    setMessage("");
  };

  const handleOpenAi = () => {
    setPage("ai");
    setMessage("");
  };

  const mathConfig = {
    loader: { load: ["input/tex", "output/svg"] },
    tex: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    },
  };

  return (
    <MathJaxContext config={mathConfig}>
      {page === "landing" ? (
        <LandingPage
          chapters={allChapters}
          onSelectChapter={handleSelectChapter}
          onSearch={handleSearch}
          onReviewRandom={handleReviewRandom}
          onOpenAi={handleOpenAi}
          message={message}
        />
      ) : page === "ai" ? (
        <AiPage onQuit={handleReturnHome} />
      ) : (
        <FlashcardPage cards={activeCards} title={activeTitle} onQuit={handleReturnHome} />
      )}
    </MathJaxContext>
  );
}
