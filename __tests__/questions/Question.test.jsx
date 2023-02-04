/* eslint-disable no-await-in-loop */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Question from '../../client/src/components/Questions/Question.jsx';
import exampleQuestions from '../example_data/questions/questions';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

// proxyQuestion must have at least 4 answers
const proxyQuestion = exampleQuestions[40356].results[0];
const proxyUnanswered = exampleQuestions[40356].results[3];

test('renders properly', () => {
  render(<Question question={proxyQuestion} filterText="" />);
  expect(screen.getByText(/q:/i)).toBeInTheDocument();
});

test('clicking Yes sends helpfulQuestion PUT request', async () => {
  fetcherMock.markHelpfulQuestion.mockResolvedValue();
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(fetcherMock.markHelpfulQuestion).toHaveBeenCalledTimes(1);
});

test('clicking Yes replaces its text with Marked!', async () => {
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(screen.getByText(/marked!/i)).toBeInTheDocument();
  expect(screen.queryByText(/yes/i)).not.toBeInTheDocument();
});

test('clicking Marked! has no effect', async () => {
  fetcherMock.markHelpfulQuestion.mockResolvedValue();
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));
  await userEvent.click(screen.getByText(/marked!/i));

  expect(fetcherMock.markHelpfulQuestion).toHaveBeenCalledTimes(1);
});

test('clicking LOAD MORE ANSWERS renders 2 more answers if available', async () => {
  render(<Question question={proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/load more answers/i));

  const answers = screen.getAllByText(/by /i);
  expect(answers.length).toBe(4);
});

test('clicking LOAD MORE ANSWERS renders 1 more answer if less than 4 answers exist', async () => {
  const proxyCopy = { ...proxyQuestion };
  proxyCopy.answers = Object.fromEntries(Object.entries(proxyQuestion.answers).slice(0, 3));
  render(<Question question={proxyCopy} filterText="" />);

  await userEvent.click(screen.getByText(/load more answers/i));

  const answers = screen.getAllByText(/by /i);
  expect(answers.length).toBe(3);
});

test('clicking add answer link will render an answer modal', async () => {
  render(<div id="modal" />);
  render(<Question question={proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/add answer/i));

  expect(screen.getByText(/submit your answer/i)).toBeInTheDocument();
});

test('clicking outside the answer modal closes it', () => {
  render(<div id="modal" />);
  render(<Question question={proxyQuestion} filterText="" />);

  userEvent.click(screen.getByText(/add answer/i));
  userEvent.click(screen.getByText(/q: /i));

  expect(screen.queryByText(/submit your answer/i)).not.toBeInTheDocument();
});
