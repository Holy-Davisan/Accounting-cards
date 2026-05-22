# UI Context

Purpose
- Provide a concise reference for automated agents and contributors to understand the app's UI structure, pages, and interaction patterns.

Key pages/components
- Landing/Chapters: `src/pages/landingPage.tsx` — lists chapters and supports section start flow.
- Flashcards: `src/pages/flashcardPage.tsx` — main review loop, renders `QuestionCard` and navigation.
- `QuestionCard` (`src/components/questionCard.tsx`): renders question, options, reveal, explanations, grading controls.
- Option rendering: `src/components/optionButton.tsx` — shows per-option explanation after reveal.
- Review components: `src/components/reviewMode.tsx`, `resultsView.tsx` — post-review flows.

Interaction patterns
- Selection: user selects an option, then hits Reveal to show correct answer and explanations.
- Grading: after reveal, user grades on 1-4 scale which updates spaced-repetition metadata.
- Sections: chapters can be split into sections (when schema supports it); UI should default to a single implicit section for legacy data.

Design tokens and styling
- Project uses Tailwind and theme tokens defined in `tailwind.config.js` and `src/index.css` for global styles.
- Prefer theme tokens (e.g., `text-clay`, `bg-organic-orange-500`) rather than raw colors.

Accessibility
- Respect `prefers-reduced-motion` for animations.
- Ensure color contrasts meet WCAG AA for text and badges.

Notes for agents
- When updating UI, prefer minimal DOM changes and use transforms for animation.
- Place normalization and backward-compatibility logic in `src/lib/*` so components receive predictable props.
