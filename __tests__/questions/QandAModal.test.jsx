import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import QandAModal from '../../client/src/components/Questions/QandAModal.jsx';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

test('renders Q modal properly', () => {
  render(<div id="modal" />);
  render(<QandAModal type="question" show />);
  expect(screen.getByText(/ask your question/i)).toBeInTheDocument();
});

test('renders A modal properly', () => {
  render(<div id="modal" />);
  render(<QandAModal type="answer" show />);
  expect(screen.getByText(/submit your answer/i)).toBeInTheDocument();
});
