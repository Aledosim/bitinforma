import React, { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()

import CurrencyProvider, { CurrencyContext } from '../../contexts/CurrencyContext'

function DefaultMockComponent() {

  const values = useContext(CurrencyContext)
  const valuesItems = Object.keys(values).map(value => {
    if (typeof values[value] === 'function') {
      return <div key={value} data-testid={value}>{value + '()'}</div>
    } else {
      return <div key={value} data-testid={value}>{values[value]}</div>
    }
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

  it('should make correct http request', async () => {

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

    // screen.debug()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/ticker/')
    expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/day-summary/2021/4/6/')

    spyDate.mockRestore()
  });

  // This test don't re render with the new data from fetch
  xit('should pass the correct values', async () => {

    fetch
      .mockResponse(req => {
        if (/.*\/ticker\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(tickerResponse) }))

        } else if (/.*\/day-summary\/.*/.test(req.url)) {
          return new Promise(() => ({ body: JSON.stringify(summaryResponse) }))

        }
      })

    render(
      <CurrencyProvider>
        <DefaultMockComponent />
      </CurrencyProvider>
    )

    await waitFor(() => expect(screen.getByTestId('currency').textContent).toBe("btc"))
    await waitFor(() => expect(screen.getByTestId('volBRL').textContent).toBe(String(summaryResponse.volume)))
    await waitFor(() => expect(screen.getByTestId('closing').textContent).toBe(String(summaryResponse.closing)))
    await waitFor(() => expect(screen.getByTestId('sell').textContent).toBe(tickerResponse.ticker.sell))
    await waitFor(() => expect(screen.getByTestId('buy').textContent).toBe(tickerResponse.ticker.buy))
    await waitFor(() => expect(screen.getByTestId('last').textContent).toBe(tickerResponse.ticker.last))
    await waitFor(() => expect(screen.getByTestId('vol').textContent).toBe(tickerResponse.ticker.vol))
    await waitFor(() => expect(screen.getByTestId('low').textContent).toBe(tickerResponse.ticker.low))
    await waitFor(() => expect(screen.getByTestId('high').textContent).toBe(tickerResponse.ticker.high))
  });
});
