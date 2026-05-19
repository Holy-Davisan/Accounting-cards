import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingPage from './pages/landingPage';
import { Chapter } from './types';

type ChapterFixture = Chapter;

const makeChapter = (count: number): ChapterFixture => ({
  id: 'chapter-1',
  title: 'Chapter One',
  description: 'Test chapter',
  cards: Array.from({ length: count }, (_, idx) => ({
    q: `Question ${idx + 1}`,
    a: 'Answer',
    o: ['Answer', 'Option B', 'Option C', 'Option D'],
    category: 'general',
    explanation: 'Test explanation',
  })),
});

describe('LandingPage section navigation', () => {
  test.each([
    [64, 7],
    [108, 11],
  ])('cycles sections for %i cards with %i sections', async (cardCount, sectionCount) => {
    const onSelectChapter = jest.fn();

    render(
      <LandingPage
        chapters={[makeChapter(cardCount)]}
        onSelectChapter={onSelectChapter}
        onSearch={() => {}}
        onReviewRandom={() => {}}
      />
    );

    expect(screen.getByText(`Section 1 / ${sectionCount}`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '<' }));
    expect(screen.getByText(`Section ${sectionCount} / ${sectionCount}`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '>' }));
    expect(screen.getByText(`Section 1 / ${sectionCount}`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Start section' }));
    expect(onSelectChapter).toHaveBeenCalledWith('chapter-1', 0);

    for (let i = 0; i < sectionCount - 1; i += 1) {
      await userEvent.click(screen.getByRole('button', { name: '>' }));
    }

    expect(screen.getByText(`Section ${sectionCount} / ${sectionCount}`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '>' }));
    expect(screen.getByText(`Section 1 / ${sectionCount}`)).toBeInTheDocument();
  });
});
