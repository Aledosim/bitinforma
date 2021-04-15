import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()

import CurrencyProvider, { CurrencyContext } from '../../contexts/CurrencyContext'

function DefaultMockComponent() {

  const values = useContext(CurrencyContext)
  const valuesItems = Object.keys(values).map(value => {
    return <div key={value}>{value}</div>
  })

  return(
    <>
      {valuesItems}
    </>
  )
}

const tickerResponse = {
  "ticker": {
    "high":"380000.00000000",
    "low":"353684.14000000",
    "vol":"259.88030295",
    "last":"359999.99006000",
    "buy":"359999.99006000",
    "sell":"360000.00000000",
    "open":"367280.01000000",
    "date":1618454505
  }
}

const summaryResponse = {
  "date":"2021-04-06",
  "opening":335104.71869,
  "closing":326900.00666999,
  "lowest":325000.11,
  "highest":336062.3858,
  "volume":41198719.10154287,
  "quantity":124.82911281,
  "amount":16817,
  "avg_price":330040.95097792
}

describe('CurrencyContext', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should make correct http request', () => {

    // Need to configure the response to avoid unwanted errors
    fetch
      .mockResponse(req => {
        if (/.*\/ticker\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(tickerResponse) }))

        } else if (/.*\/day-summary\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(summaryResponse) }))

        }
      })

    const date = new Date(2021, 3, 7)
    const spyDate = jest.spyOn(global, 'Date').mockImplementation(() => date)

    render(
      <CurrencyProvider>
        <DefaultMockComponent />
      </CurrencyProvider>
    )

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/ticker/')
    expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/day-summary/2021/4/6/')

    spyDate.mockRestore()
  });

  it('should pass the correct values', () => {

    fetch
      .mockResponse(req => {
        if (/.*\/ticker\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(tickerResponse) }))

        } else if (/.*\/day-summary\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(summaryResponse) }))

        }
      })

    const date = new Date(2021, 3, 7)
    const spyDate = jest.spyOn(global, 'Date').mockImplementation(() => date)

    render(
      <CurrencyProvider>
        <DefaultMockComponent />
      </CurrencyProvider>
    )

    console.log(screen.getByText('high'))
    expect(screen.getByText('high').innerText).toBe('high')

    spyDate.mockRestore()
  });
});
