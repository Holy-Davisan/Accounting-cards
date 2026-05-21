import React, { useEffect, useState } from "react";

type Props = {
  trigger: number; // increment to trigger
  count: number; // how many emojis to spawn
};

const EMOJIS = ["🤡", "😨", "👺", "👹", "💀"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function WrongBurst({ trigger, count }: Props) {
  const [items, setItems] = useState<{ id: number; left: number; top: number; emoji: string; delay: number }[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const newItems: typeof items = [];
    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Date.now() + i,
        left: rand(5, 95),
        top: rand(5, 80),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        delay: Math.random() * 300,
      });
    }
    setItems(newItems);

    const cleanup = setTimeout(() => setItems([]), 1200 + 400);
    return () => clearTimeout(cleanup);
  }, [trigger, count]);

  if (items.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10001 }}>
      {items.map((it) => (
        <span
          key={it.id}
          style={{
            position: "absolute",
            left: `${it.left}%`,
            top: `${it.top}%`,
            transform: "translate(-50%, -50%) scale(0)",
            fontSize: 32 + Math.floor(Math.random() * 24),
            display: "inline-block",
            opacity: 1,
            animation: `emojiPop 900ms cubic-bezier(.2,.8,.2,1) ${it.delay}ms forwards`,
          }}
        >
          {it.emoji}
        </span>
      ))}

      <style>{`
        @keyframes emojiPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0 }
          30% { transform: translate(-50%, -50%) scale(1.6); opacity: 1 }
          100% { transform: translate(-50%, -50%) scale(0); opacity: 0 }
        }
      `}</style>
    </div>
  );
}
