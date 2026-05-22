# Code Standards

Purpose
- A concise set of conventions to keep the codebase consistent and easy for agents and humans to modify.

Formatting & linting
- Use the project's existing Prettier/ESLint defaults (React + TypeScript). Run `npm run lint` if available.
- Keep files under 300 lines where practical; split large components into smaller presentational pieces.

TypeScript
- Prefer strong types in `src/types/index.ts`. Avoid `any` unless unavoidable; prefer narrow union types.
- Export shared domain types from `src/types/index.ts` and import them explicitly.

React
- Use function components and hooks. Prefer small, pure components with props documented in code.
- Keep side effects inside `useEffect` with proper dependency lists.

Styling
- Use Tailwind tokens and utility classes for layout. Create small component-level CSS modules only for complex animations or vendor-specific styles.

Testing
- Add unit tests for any migration/normalization logic and critical UI flows. Use `react-scripts test` patterns present in the repo.

Commits & PRs
- Commit messages: short imperative subject + optional body. Example: `Add normalizeCard helper and wire data`.
- Open focused PRs with a clear description, changed files list, and testing steps.

Agent guidelines
- Agents should change domain types only when necessary and update any consuming components and tests in the same PR.
- When adding features, include a small migration/normalization to preserve compatibility with existing data.
