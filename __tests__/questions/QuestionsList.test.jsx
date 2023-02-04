/* eslint-disable no-await-in-loop */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import QuestionsList from '../../client/src/components/Questions/QuestionsList.jsx';
import mockQuestions from '../example_data/questions/questions';

test('renders 2 questions with answers on load', () => {
  render(<QuestionsList questions={mockQuestions[40356].results} filterText="" />);
  const questions = screen.getAllByRole('heading', { name: /q:/i });
  expect(questions.length).toBe(2);
});

test('renders 2 more questions on button click', async () => {
  render(<QuestionsList questions={mockQuestions[40356].results} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });

  await userEvent.click(button);
  const questions = await screen.findAllByRole('heading', { name: /q:/i });

  expect(questions.length).toBe(4);
});

test('hides MORE button when there are no more questions to load', async () => {
  render(<QuestionsList questions={mockQuestions[40356].results} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });
  const passedQuestions = mockQuestions[40356].results;
  const numClicks = Math.ceil(passedQuestions.length / 2) - 1;

  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(button);
  }

  expect(button).not.toBeInTheDocument();
});

test('should only render questions with answers', async () => {
  const questionsWithAnswers = mockQuestions[40356].results
    .filter((question) => Object.keys(question.answers).length);
  render(<QuestionsList questions={questionsWithAnswers} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });
  const passedQuestions = questionsWithAnswers;
  const numClicks = Math.ceil(passedQuestions.length / 2) - 1;

  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(button);
  }
  const questions = await screen.findAllByRole('heading', { name: /q:/i });
  const answers = await screen.findAllByRole('heading', { name: /a:/i });

  expect(button).not.toBeInTheDocument();
  expect(questions.length).toEqual(answers.length);
});
