import React from 'react';
// Installation is suggest from React website
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import Related from './Related.jsx';

describe('Initiation the Page', () => {
  test('Render the Related & Outfit Product Header', () => {
    render(<Related />);
    const textElement = screen.getByText('RELATED PRODUCTS');
    expect(textElement).toBeInTheDocument();
  });
});
