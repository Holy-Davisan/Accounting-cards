Title: Improve incorrect-answer animation (slower, xy-rotation)

Summary
- Tweak the incorrect answer animation to be less insulting: slow down the scale animation and add a subtle XY rotation oscillation after max scale is reached.

Goal
- Provide a refined animation that signals incorrect answers without aggressive motion—improve pacing and add a brief back-and-forth rotation for polish.

Acceptance criteria
- The incorrect animation plays slower (duration increased) and adds an XY rotation oscillation (e.g., rotateX/rotateY or transform rotate with subtle degrees) once per reveal.
- Animation must not cause layout reflow (use transform) and must respect `prefers-reduced-motion` accessibility setting (fall back to instant state change or a simple fade).
- Existing tests that rely on DOM state remain valid; animation changes do not break logic.

Tasks
1. Locate the CSS/Tailwind classes or animation code responsible for incorrect-answer animation (likely in `wrongBurst.tsx` or related components).
2. Adjust timing, easing, and transform to slow the animation and add a small rotation sequence.
3. Add `@media (prefers-reduced-motion: reduce)` behavior to disable animation or show a simple color change.
4. Add a small unit/visual test or manual QA note to validate the animation timing.

Implementation notes
- Prefer CSS `transform: translateZ(0) rotateX(...) rotateY(...) scale(...)` with `transition` or `@keyframes` for smoother motion.
- Keep angles small (2-6 degrees) and limits tight so motion is subtle and non-dizzying.
- Use Tailwind's plugin system or add a small CSS module to keep styles scoped.

Files to change (suggested)
- `src/components/wrongBurst.tsx`
- `src/index.css` or a dedicated CSS module
- tests or docs for animation behavior

Estimated effort
- 1-2 hours (small styling tweak + accessibility check)
