import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { tickerResponse, summaryResponse } from '../fixtures.json'
import CurrencyProvider from '../../contexts/CurrencyContext'

import InfoCard24h from '../../components/InfoCard24h'

describe('<InfoCard24h /> tests', () => {
  beforeEach(() => {
    fetch.resetMocks()

    fetch
      .mockResponse(req => {
        if (/.*\/ticker\/.*/.test(req.url)) {
          return Promise.resolve({ body: JSON.stringify(tickerResponse) })

        } else if (/.*\/day-summary\/.*/.test(req.url)) {
          return Promise.resolve({ body: JSON.stringify(summaryResponse) })

        }
      })
  })

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
