import React from 'react'
import { render, waitFor } from '@testing-library/react'

import App from '../../components/App';

it('renders without crashing', async () => {
  const tree = render(<App />)

  // Check if the fetch data is rendered
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  expect(tree).toMatchSnapshot()
});
