import React from 'react'
import { render, waitFor } from '@testing-library/react'

import CurrencyProvider from '../../contexts/CurrencyContext'

import InfoCard24h from '../../components/InfoCard24h'

describe('<InfoCard24h /> tests', () => {

  it('renders without crashing', async () => {

    const tree = render(
      <CurrencyProvider>
        <InfoCard24h />
      </CurrencyProvider>
    )

    // Check if the fetch data is rendered
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    expect(tree).toMatchSnapshot()
  })
})
