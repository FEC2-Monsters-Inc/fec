import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import QandAModal from '../../client/src/components/Questions/QandAModal.jsx';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

test('renders Q modal', () => {
  render(<div id="modal" />);
  render(<QandAModal type="question" show />);
  expect(screen.getByText(/ask your question/i)).toBeInTheDocument();
});

test('text renders when user types', async () => {
  render(<div id="modal" />);
  render(<QandAModal type="question" show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');

  expect(screen.getByRole('textbox', { name: /question/i })).toHaveValue('Why, Jack?');
  expect(screen.getByRole('textbox', { name: /nickname/i })).toHaveValue('rosemary22');
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('rose@mary.com');
});

test('posts question on submit', async () => {
  fetcherMock.postQuestion.mockResolvedValueOnce();
  render(<div id="modal" />);
  render(<QandAModal type="question" setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postQuestion).toHaveBeenCalledTimes(1);
});

// test('doesn\'t post question on submit when required fields aren\'t met');

test('renders A modal', () => {
  render(<div id="modal" />);
  render(<QandAModal type="answer" show />);
  expect(screen.getByText(/submit your answer/i)).toBeInTheDocument();
});

test('text renders when user types', async () => {
  render(<div id="modal" />);
  render(<QandAModal type="answer" show />);

  await userEvent.type(screen.getByRole('textbox', { name: /answer/i }), 'IDK');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'jackson11!');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'json@eleven.com');

  expect(screen.getByRole('textbox', { name: /answer/i })).toHaveValue('IDK');
  expect(screen.getByRole('textbox', { name: /nickname/i })).toHaveValue('jackson11!');
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('json@eleven.com');
});

test('posts answer on submit', async () => {
  fetcherMock.postAnswer.mockResolvedValueOnce();
  render(<div id="modal" />);
  render(<QandAModal type="answer" setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /answer/i }), 'IDK');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'jackson11!');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'json@eleven.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postAnswer).toHaveBeenCalledTimes(1);
});

// test('doesn\'t post answer on submit when required fields aren\'t met');
