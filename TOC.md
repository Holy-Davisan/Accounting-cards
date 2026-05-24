Here is your TOC document with all the leading tabs removed:

* [ ] initial.md

> A starting notes file describing the project goals and early thoughts; useful for historical context.

* [ ] package.json

> Top-level npm metadata and scripts for the workspace; defines workspace-level commands and dependencies.

* [ ] README.md

> Project overview and quickstart instructions for contributors and operators.

* [ ] TOC.md

> This file — a navigable checklist of repository files and short descriptions.

* [ ] specs/

> Folder containing specification documents that drive feature work and schema decisions.

## *accounting/*

* [ ] accounting/package.json

> Frontend app manifest and scripts for the React app under the accounting folder.

* [ ] accounting/tsconfig.json

> TypeScript config for the accounting app; enforces strict compilation.

* [ ] accounting/ai-server.js

> Small local AI helper server used during development for model proxies.

* [ ] accounting/build/

> Compiled production assets for quick local deploy and previews.

* [ ] accounting/data/

> Runtime JSON assets and build-time index files used by the app.

* [ ] accounting/public/index.html

> App entry HTML template and manifest files used for builds.

### _ accounting/src _

* [ ] app.tsx

> Main React application root; wires pages, state, and MathJax configuration.

* [ ] index.tsx

> DOM bootstrapper that mounts the React application.

* [ ] app.css / index.css

> Global styles used by the app (tailwind + local utilities).

* [ ] react-app-env.d.ts

> React/TS environment type shims required by the CRA toolchain.

* [ ] report-web-vitals.ts

> Performance telemetry hooks used in development.

* [ ] setupTests.ts

> Test setup and global test utilities.

***Components/***

* [ ] confetti.tsx

> Visual confetti component used when the user answers correctly.

* [ ] math-text.tsx

> Lightweight parser and renderer for inline/display MathJax segments.

* [ ] math-text.test.tsx

> Unit tests for the math-text parser.

* [ ] notification-banner.tsx

> Dismissible success/error banner shown after actions.

* [ ] option-button.tsx

> Reusable option/button used inside question cards.

* [ ] question-card.tsx

> Primary UI for displaying a single question, options and grading controls.

* [ ] results-view.tsx

> Session summary UI showing correct/wrong counts and next steps.

* [ ] review-mode.tsx

> UI used to review wrong cards after a session.

* [ ] wrong-burst.tsx

> Decorative animation shown on wrong answers to increase feedback.

***Data/***

* [ ] index.ts

> Aggregates chapter definitions and normalizes card data for runtime.

* [ ] index.test.ts

> Tests asserting data normalization and index behavior.

* [ ] cards/

> Moduleized card lists per chapter; source of truth for deterministic content.

* [ ] chapter1.ts, chapter2.ts, chapter3.ts, chapter4.ts

> Chapter card arrays used by the app.

* [ ] ai/

> Deterministic AI index and AI-specific card definitions used by the assistant.

* [ ] index.ts

> AI-specific aggregation and helpers.

* [ ] keyword-index.json

> Precomputed keyword index for deterministic search.

***Hooks/***

* [ ] use-flashcards.ts

> Custom hook encapsulating flashcard session logic and review flows.

* [ ] use-score.ts

> Hook that tracks and persists user score and wrong-cards during a session.

***Lib/***

* [ ] fsrs.ts

> FSRS scheduling utilities: next review, difficulty adjustments and helpers used by smart selection.

* [ ] normalizers.ts

> Data normalization helpers that ensure card objects are consistent and safe.

* [ ] smart-cards.ts

> Logic to select the most urgent cards for spaced repetition review.

***Pages/***

* [ ] landing-page.tsx

> Home/landing UI for chapter selection, search and entry points to study modes.

* [ ] flashcard-page.tsx

> The study session view that composes question-card and results components.

* [ ] ai-page.tsx

> AI assistant UI for deterministic search and model-generated answers.

* [ ] flashcard-page.backup

> A backup copy of the prior flashcard page kept for reference (should be removed or documented before merge).

***Types/***

* [ ] index.ts

> Shared TypeScript types and interfaces used across the app (Card, Chapter, AiCard, etc.).

## context/

> Project-level documentation and engineering standards (including code-standards.md).

* [ ] code-standards.md

> The canonical engineering and coding standards to follow in this repo.

## specs/

> Higher-level specs and feature documents that guide development and PRs.
