/* eslint-disable no-multi-str, no-await-in-loop */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Questions from '../../client/src/components/Questions/Questions.jsx';
import QuestionsList from '../../client/src/components/Questions/QuestionsList.jsx';
import mockProducts from '../example_data/products/product';
import mockQuestions from '../example_data/questions/questions';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Questions & Answers Component', () => {
  beforeEach(() => {
    fetcherMock.getQuestionsById.mockResolvedValueOnce({ data: mockQuestions[40356] });
    render(<Questions feature={mockProducts[40356]} />);
  });

  it('should fetch questions once on load', async () => {
    expect(fetcherMock.getQuestionsById).toHaveBeenCalledTimes(1);
  });

  describe('Search Bar', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('shouldn\'t filter questions if typing less than 3 characters', async () => {
      const user = userEvent.setup({ delay: null });
      const searchbar = screen.getByRole('searchbox', { name: /search question/i });
      const questionsBefore = await screen.findAllByRole('heading', { name: /q: /i });

      await user.type(searchbar, 'te');
      act(() => {
        jest.advanceTimersByTime(500);
      });

      const questionsAfter = await screen.findAllByRole('heading', { name: /q: /i });
      expect(questionsBefore).toEqual(questionsAfter);
    });

    it('shouldn\'t filter questions before input is debounced', async () => {
      const user = userEvent.setup({ delay: null });
      const searchbar = screen.getByRole('searchbox', { name: /search question/i });
      const questionsBefore = await screen.findAllByRole('heading', { name: /q: /i });

      await user.type(searchbar, 'tem');
      act(() => {
        jest.advanceTimersByTime(499);
      });

      const questionsAfter = await screen.findAllByRole('heading', { name: /q: /i });
      expect(questionsBefore).toEqual(questionsAfter);
    });

    it('should filter questions after typing 3 characters and waiting 500ms', async () => {
      const user = userEvent.setup({ delay: null });
      const searchbar = screen.getByRole('searchbox', {
        name: /search question/i,
      });

      await user.type(searchbar, 'tem');
      act(() => {
        jest.advanceTimersByTime(500);
      });

      const questions = await screen.findAllByRole('heading', { name: /q: /i });

      questions.map((question) => expect(question).toHaveTextContent(/tem/i));
    });
  });
});

describe('QuestionsList Component', () => {
  beforeEach(() => {
    render(<QuestionsList
      questions={mockQuestions[40356].results}
      filterText=""
    />);
  });

  it('should only render 2 questions with answers on load', () => {
    const questions = screen.getAllByRole('heading', { name: /q: /i });

    expect(questions.length).toBe(2);
  });

  it('should render 2 more questions on button click', async () => {
    const button = screen.getByRole('button', {
      name: 'MORE ANSWERED QUESTIONS',
    });

    await userEvent.click(button);
    const questions = await screen.findAllByRole('heading', { name: /q: /i });

    expect(questions.length).toBe(4);
  });

  it('should hide MORE button when there are no more questions to load', async () => {
    const button = screen.getByRole('button', { name: /more answered questions/i });
    const passedQuestions = mockQuestions[40356].results;
    const numClicks = Math.ceil(passedQuestions.length / 2) - 1;

    for (let i = 0; i < numClicks; i += 1) {
      await userEvent.click(button);
    }

    expect(button).not.toBeInTheDocument();
  });
});
