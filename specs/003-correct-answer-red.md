Title: Reveal correct answer in red after user submits

Summary
- After the user submits an answer, render the correct answer text in red to improve memory retention (per research note). Keep styling accessible and optionally configurable.

Goal
- Make correct answers visually distinct (red) immediately after submission; allow toggling this behavior in settings.

Acceptance criteria
- When an answer is submitted, the correct option's text is styled with a red color token.
- Color choice meets contrast/accessibility requirements; setting `showCorrectInRed: boolean` toggles behavior.
- Tests confirm the correct item receives the styling after submit.

Tasks
1. Add a small boolean setting `showCorrectInRed` in app settings or a feature flag; default to `true`.
2. In `questionCard.tsx`, after submit, add a class to the correct option to apply `text-red-600` (or theme token).
3. Ensure accessibility: run a basic contrast check and provide alternative emphasis (icon or bold) if needed.
4. Add unit/test verifying class applied after submit.

Implementation notes
- Use Tailwind theme tokens already present in the project; avoid hardcoded hex unless necessary.
- Consider adding a `data-testid` for the correct option to simplify tests.

Files to change (suggested)
- `src/components/questionCard.tsx`
- `src/pages/flashcardPage.tsx` (settings area)
- tests in `src/components` for submit behavior

Estimated effort
- 1-2 hours (small UI change + tests)
