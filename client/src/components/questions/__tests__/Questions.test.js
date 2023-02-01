import { render, screen, cleanup } from '@testing-library/react';
import Questions from '../Questions.jsx';

test('should render Questions component', () => {
  render(<Questions />);
  const questionsElement = screen.getAllByTestId('questions-1');
});
