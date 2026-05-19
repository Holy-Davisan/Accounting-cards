import React, { useState } from "react";
import { AiCard } from "../types";

type QueryResponse = {
  question: string;
  tokens: string[];
  cards: AiCard[];
};

type AnswerResponse = {
  answer: string;
  context: string[];
};

type Props = {
  onQuit: () => void;
};

export default function AiPage({ onQuit }: Props) {
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState<AiCard[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [context, setContext] = useState<string[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [error, setError] = useState("");
  const [queryInfo, setQueryInfo] = useState<string>("");

  const handleSearch = async () => {
    setError("");
    setAnswer("");
    setLoadingSearch(true);
    try {
      const trimmed = question.trim();
      if (!trimmed) {
        setError("Please enter a question before searching.");
        return;
      }

      const res = await fetch(`/api/ai/query?question=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        throw new Error(`Search failed: ${res.status}`);
      }
      const data = (await res.json()) as QueryResponse;
      setResults(data.cards);
      setQueryInfo(`${data.cards.length} deterministic cards matched`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleAnswer = async () => {
    setError("");
    setLoadingAnswer(true);
    try {
      const trimmed = question.trim();
      if (!trimmed) {
        setError("Please enter a question before asking the model.");
        return;
      }

      const res = await fetch(`/api/ai/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Answer request failed: ${res.status}`);
      }

      const data = (await res.json()) as AnswerResponse;
      setAnswer(data.answer);
      setContext(data.context || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Answer request failed");
    } finally {
      setLoadingAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 to-charcoal p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-organic bg-white p-8 shadow-organic border border-clay/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-organic-orange-500 uppercase tracking-[0.2em] font-mono">AI assistant</p>
              <h1 className="mt-3 text-4xl font-serif font-bold tracking-tight text-charcoal">Ask the accounting AI</h1>
              <p className="mt-4 text-clay max-w-2xl">
                Use deterministic search to find the best card data, then optionally generate an answer with the local Ollama model.
              </p>
            </div>
            <button
              onClick={onQuit}
              className="inline-flex items-center justify-center rounded-organic bg-charcoal px-6 py-3 text-sm font-semibold text-cream shadow-organic transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-95"
            >
              Back to study
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full rounded-industrial border-2 border-clay/30 bg-cream px-4 py-3 text-charcoal outline-none transition-all duration-200 focus:border-organic-orange-500 focus:ring-2 focus:ring-organic-orange-300 font-sans"
              placeholder="Ask a question about accounting concepts, financial statements, or one of the flashcard topics."
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                disabled={loadingSearch}
                onClick={handleSearch}
                className="rounded-organic bg-organic-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingSearch ? "Searching…" : "Search deterministic facts"}
              </button>
              <button
                disabled={loadingAnswer}
                onClick={handleAnswer}
                className="rounded-organic bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-gray-800 hover:shadow-organic active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAnswer ? "Generating…" : "Generate AI answer"}
              </button>
            </div>
            {queryInfo ? (
              <div className="rounded-industrial border border-clay/20 bg-clay/5 px-4 py-3 text-sm text-charcoal">
                {queryInfo}
              </div>
            ) : null}
            {error ? (
              <div className="rounded-industrial border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </div>
        </div>

        {answer ? (
          <div className="rounded-organic bg-white p-6 shadow-organic border border-clay/20">
            <h2 className="text-xl font-semibold text-charcoal">AI Answer</h2>
            <p className="mt-4 text-clay whitespace-pre-wrap">{answer}</p>
          </div>
        ) : null}

        {context.length > 0 ? (
          <div className="rounded-organic bg-white p-6 shadow-organic border border-clay/20">
            <h2 className="text-xl font-semibold text-charcoal">Context used</h2>
            <ul className="mt-4 list-disc pl-5 text-clay">
              {context.map((item, idx) => (
                <li key={idx} className="mt-2">{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="rounded-organic bg-white p-6 shadow-organic border border-clay/20">
            <h2 className="text-xl font-semibold text-charcoal">Deterministic search results</h2>
            <div className="mt-4 space-y-4">
              {results.map((card) => (
                <div key={card.id} className="rounded-organic border border-clay/20 bg-clay/5 p-4">
                  <div className="flex items-center justify-between gap-3 text-sm text-charcoal">
                    <span className="font-semibold">{card.id}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-organic-orange-500">Answer: {card.a}</span>
                  </div>
                  <p className="mt-3 text-charcoal">{card.q}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {card.o.map((option, index) => (
                      <div key={option} className="rounded-industrial border border-clay/20 bg-white px-3 py-2 text-sm text-charcoal">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
