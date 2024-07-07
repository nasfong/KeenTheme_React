// GraphqlPage.test.tsx
import {
  render,
  waitFor,
} from '@testing-library/react';

import { useQueryMenu } from 'hook/useMenu'
import GraphqlPage from 'GraphqlPage';

// Mocking the useQueryMenu hook
jest.mock('hook/useMenu', () => ({
  useQueryMenu: jest.fn(),
}));

const mockData = {
  getAllMenus: [
    { id: 1, name: 'Menu 1', url: 'menu1' },
    { id: 2, name: 'Menu 2', url: 'menu2' }
  ]
}

// const mockLoading = false;

describe('Graphql', () => {

  it('have data and loading false', async () => {

    (useQueryMenu as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    const { getByText, getByRole, } = render(<GraphqlPage />);
    await waitFor(() => {
      expect(getByText('Graphql')).toBeInTheDocument();
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Home Page/i)
      expect(getByText('Menu 1')).toBeInTheDocument()
      expect(getByText('Menu 2')).toBeInTheDocument()
    })
  })

  it('renders loading state and then handles the case when data is not available', async () => {

    (useQueryMenu as jest.Mock).mockReturnValue({ data: undefined, loading: true });

    const { getByText, queryByText } = render(<GraphqlPage />);
    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
      expect(queryByText('Graphql')).toBeNull();
      expect(queryByText(/Home Page/i)).toBeNull()
      expect(queryByText('Menu 1')).toBeNull()
      expect(queryByText('Menu 2')).toBeNull()
    })
  })

})

