import React from "react";
import { Card } from "../types";
import { useScore } from "../hooks/useScore";
import { useFlashcards } from "../hooks/useFlashcards";
import QuestionCard from "../components/questionCard";
import ResultsView from "../components/resultsView";
import Confetti from "../components/confetti";
import WrongBurst from "../components/wrongBurst";
import NotificationBanner from "../components/notificationBanner";

type Props = {
  cards: Card[];
  title: string;
  onQuit: () => void;
};

export default function FlashcardPage({ cards, title, onQuit }: Props) {
  const score = useScore();
  const [confettiBurst, setConfettiBurst] = React.useState(0);
  const [wrongBurstTrigger, setWrongBurstTrigger] = React.useState(0);
  const [wrongBurstCount, setWrongBurstCount] = React.useState(0);
  const [gradeHistory, setGradeHistory] = React.useState<Array<{ q: string; grade: 1 | 2 | 3 | 4; ts: string }>>([]);
  const [gradeError, setGradeError] = React.useState("");
  const [gradingInProgress, setGradingInProgress] = React.useState(false);
  const [notificationVisible, setNotificationVisible] = React.useState(false);
  const [notificationType, setNotificationType] = React.useState<'success' | 'error'>('success');
  const [notificationMessage, setNotificationMessage] = React.useState("");

  const handleGrade = async (grade: 1 | 2 | 3 | 4) => {
    setGradeError("");
    setGradingInProgress(true);
    const card = flash.card;
    if (!card) {
      setGradingInProgress(false);
      return;
    }

    // Extract chapter ID from title (e.g., "Chapter 1" -> "chapter-1")
    const chapterMatch = title.match(/chapter\s+(\d+)/i);
    const chapterId = chapterMatch ? `chapter-${chapterMatch[1]}` : null;
    if (!chapterId) {
      setGradeError("Could not determine chapter");
      setNotificationType('error');
      setNotificationMessage("Could not determine chapter");
      setNotificationVisible(true);
      setGradingInProgress(false);
      return;
    }

    try {
      const res = await fetch("/api/fsrs/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId, cardQuestion: card.q, grade }),
      });
      if (!res.ok) {
        const err = await res.json();
        const errorMsg = err.error || "Failed to save grade";
        setGradeError(errorMsg);
        setNotificationType('error');
        setNotificationMessage(errorMsg);
        setNotificationVisible(true);
        setGradingInProgress(false);
        return;
      }
      // persist to gradeHistory
      setGradeHistory((prev) => [...prev, { q: card.q, grade, ts: new Date().toISOString() }]);
      
      // Show success notification
      setNotificationType('success');
      setNotificationMessage("");
      setNotificationVisible(true);
      
      setGradingInProgress(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Network error";
      setGradeError(errorMsg);
      setNotificationType('error');
      setNotificationMessage(errorMsg);
      setNotificationVisible(true);
      setGradingInProgress(false);
    }
  };

  const flash = useFlashcards(cards, {
    onCorrect: (card) => {
      score.markCorrect();
      setConfettiBurst((c) => c + 1);
    },
    onWrong: (card) => {
      score.markWrong(card);
      const n = 7 + Math.floor(Math.random() * 9); // 7..15
      setWrongBurstCount(n);
      setWrongBurstTrigger((t) => t + 1);
    },
  });

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-50 p-4">
        <div className="w-full max-w-md rounded-organic border-2 border-clay/20 bg-white p-8 text-center shadow-organic">
          <h1 className="text-2xl font-serif font-bold text-charcoal">No cards found</h1>
          <p className="mt-3 text-clay font-sans">Return to the home page and try a different chapter or search term.</p>
          <button
            onClick={onQuit}
            className="mt-6 rounded-organic bg-organic-orange-500 px-5 py-3 text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95 font-semibold"
          >
            Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  if (flash.shouldReview && !flash.isDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-50 p-4">
        <div className="w-full max-w-md rounded-organic border-2 border-clay/20 bg-white p-8 text-center shadow-organic">
          <h1 className="text-2xl font-serif font-bold text-charcoal">🧠 Section Complete</h1>
          <p className="mt-3 text-clay font-sans">
            You've completed {flash.i % flash.total === 0 ? flash.total : flash.i % flash.total} cards in this round.
            {flash.nextRoundWrongCards.length > 0
              ? ` Time to review the ${flash.nextRoundWrongCards.length} card${flash.nextRoundWrongCards.length === 1 ? '' : 's'} you got wrong.`
              : ' Great job! No wrong cards to review.'
            }
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            {flash.nextRoundWrongCards.length > 0 ? (
              <button
                onClick={flash.startReview}
                className="rounded-organic bg-rose-500 px-5 py-3 text-white transition-all duration-200 hover:bg-rose-700 hover:shadow-organic active:scale-95 font-semibold"
              >
                Review Wrong Cards
              </button>
            ) : (
              <button
                onClick={flash.continueAfterReview}
                className="rounded-organic bg-organic-orange-500 px-5 py-3 text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95 font-semibold"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (flash.isDone) {
    return (
      <ResultsView
        correct={score.correct}
        wrong={score.wrong}
        wrongCards={score.wrongCards}
        onReturnHome={onQuit}
      />
    );
  }

  const isCorrect = flash.selected === flash.card.a;

  return (
    <div className="min-h-screen bg-forest-50 p-4">
      <Confetti burst={confettiBurst} />
      <NotificationBanner 
        type={notificationType}
        message={notificationMessage}
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
      />
      <div className="w-full max-w-2xl mx-auto">
        <WrongBurst trigger={wrongBurstTrigger} count={wrongBurstCount} />
        <div className="h-2 bg-clay/20 rounded-industrial w-full mb-8 shadow-inner">
          <div
            className="h-full bg-organic-orange-500 rounded-industrial transition-all duration-300"
            style={{ width: `${((flash.i + 1) / flash.total) * 100}%` }}
          />
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-organic bg-white p-6 shadow-organic border-l-4 border-organic-orange-500">
          <div>
            <p className="text-sm font-mono font-semibold text-organic-orange-500 uppercase tracking-wide">{title}</p>
            <h1 className="mt-2 text-2xl font-serif font-bold text-charcoal">Flashcard session</h1>
          </div>
          <button
            onClick={onQuit}
            className="self-start rounded-industrial bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-gray-800 hover:shadow-industrial active:scale-95"
          >
            Back to Chapters
          </button>
        </div>

        <QuestionCard
          card={flash.card}
          index={flash.i}
          total={flash.total}
          selected={flash.selected}
          revealed={flash.revealed}
          isCorrect={isCorrect}
          onSelect={flash.select}
          onReveal={flash.reveal}
          onNext={flash.next}
          onGrade={handleGrade}
          gradingInProgress={gradingInProgress}
        />
      </div>
    </div>
  );
}
