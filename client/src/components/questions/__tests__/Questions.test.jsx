import React from 'react';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Questions from '../Questions.jsx';
import exampleFeature from '../../../../../examples/products/product';
import exampleQuestions from '../../../../../examples/questions/questions';
import fetcherMock from '../../../fetchers/questions';

jest.mock('../../../fetchers/questions');

beforeEach(() => jest.clearAllMocks());
afterEach(cleanup);

describe('Questions & Answers Component', () => {
  it('should render Questions component', async () => {
    fetcherMock.getQuestionsById.mockResolvedValueOnce({ data: exampleQuestions });
    render(<Questions feature={exampleFeature} />);

    const header = await screen.findByRole('heading', { level: 2 });

    expect(header).toBeInTheDocument();
  });

  it('should fetch questions on load', async () => {
    fetcherMock.getQuestionsById.mockResolvedValueOnce({ data: exampleQuestions });
    render(<Questions feature={exampleFeature} />);

    await waitFor(() => expect(fetcherMock.getQuestionsById).toHaveBeenCalled());
  });

  it('should only render 2 questions with answers on load', async () => {
    fetcherMock.getQuestionsById.mockResolvedValueOnce({ data: exampleQuestions });
    render(<Questions feature={exampleFeature} />);

    const questions = await screen.findAllByText('Q: ', { exact: false });
    expect(questions.length).toBe(2);
  });

  it('should render 2 more questions on button click', async () => {
    fetcherMock.getQuestionsById.mockResolvedValueOnce({ data: exampleQuestions });
    render(<Questions feature={exampleFeature} />);
    const user = userEvent.setup();

    const button = await screen.findByRole('button', { name: 'MORE ANSWERED QUESTIONS' });
    expect(button).toBeInTheDocument();

    let questions = await screen.findAllByText('Q: ', { exact: false });
    expect(questions.length).toBe(2);

    await user.click(button);

    questions = await screen.findAllByText('Q: ', { exact: false });
    expect(questions.length).toBe(4);
  });
});
