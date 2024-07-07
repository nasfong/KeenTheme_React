// test/test.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Home from '../../src/Home';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}))

test('renders the component', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // h1
  const textElement = screen.getByText(/Home/i);
  expect(textElement).toBeInTheDocument();

  // h2
  const countElement = screen.getByText(/0/i)
  expect(countElement).toBeInTheDocument()

  //button 
  const buttonElement = screen.getByRole('button')
  fireEvent.click(buttonElement)
  expect(countElement).toHaveTextContent('1')

  // Link
  const linkElement = screen.getByText(/Management/i)
  expect(linkElement).toBeInTheDocument()

  // h3
  const textTranslateElement = screen.getByText(/HELLO/i)
  expect(textTranslateElement).toBeInTheDocument()

  // input
  const inputElement = screen.getByRole('textbox')
  const textElement2 = screen.getByRole('heading', { level: 4 })
  fireEvent.change(inputElement, { target: { value: 'world' } })
  // expect(inputElement).toHaveValue('world')
  expect(textElement2).toHaveTextContent('hellos world')


});
