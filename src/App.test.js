import { render, screen } from '@testing-library/react';
import Header from './components/Header';

test('renders BiblioIntercambio heading', () => {
  render(<Header />);
  const headingElement = screen.getByText(/BiblioIntercambio/i);
  expect(headingElement).toBeInTheDocument();
});
