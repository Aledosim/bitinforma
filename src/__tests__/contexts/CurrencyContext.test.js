import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()
import React, { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { tickerResponse, summaryResponse } from '../fixtures.json'

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

describe('CurrencyContext', () => {
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

  it('should make correct http request', async () => {

    const date = new Date(2021, 3, 7)
    const spyDate = jest.spyOn(global, 'Date').mockImplementation(() => date)

    render(
      <CurrencyProvider>
        <DefaultMockComponent />
      </CurrencyProvider>
    )

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
      expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/ticker/')
      expect(fetch).toHaveBeenCalledWith('https://www.mercadobitcoin.net/api/btc/day-summary/2021/4/6/')
    })

    spyDate.mockRestore()
  });

  it('should pass the correct values', async () => {

    render(
      <CurrencyProvider>
        <DefaultMockComponent />
      </CurrencyProvider>
    )

    expect(screen.getByTestId('currency').textContent).toBe('btc')
    expect(screen.getByTestId('setCurrency').textContent).toBe('setCurrency()')

    await waitFor(() => {
      expect(screen.getByTestId('volBRL').textContent)
        .toBe(String(summaryResponse.volume))
      expect(screen.getByTestId('closing').textContent)
        .toBe(String(summaryResponse.closing))
      expect(screen.getByTestId('sell').textContent)
        .toBe(tickerResponse.ticker.sell)
      expect(screen.getByTestId('buy').textContent)
        .toBe(tickerResponse.ticker.buy)
      expect(screen.getByTestId('last').textContent)
        .toBe(tickerResponse.ticker.last)
      expect(screen.getByTestId('vol').textContent)
        .toBe(tickerResponse.ticker.vol)
      expect(screen.getByTestId('low').textContent)
        .toBe(tickerResponse.ticker.low)
      expect(screen.getByTestId('high').textContent)
        .toBe(tickerResponse.ticker.high)
    })

  });
});
