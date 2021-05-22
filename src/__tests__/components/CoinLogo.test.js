import React from 'react'
import { render, waitFor } from '@testing-library/react'

import CurrencyProvider from '../../contexts/CurrencyContext'

import { CoinLogo } from '../../components/CoinLogo'

describe('<CoinLogo /> tests', () => {

  it('renders without crashing', async () => {
    const tree = render(
      <CurrencyProvider>
        <CoinLogo />
      </CurrencyProvider>
    )

    // Check if the fetch data is rendered
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    expect(tree).toMatchSnapshot()
  });
})

