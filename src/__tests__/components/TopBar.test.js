import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()
import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'

import { tickerResponse, summaryResponse } from '../fixtures.json'
import CurrencyProvider from '../../contexts/CurrencyContext'

import TopBar, { search } from '../../components/TopBar'

function testRender() {
    return render(
      <CurrencyProvider>
        <TopBar />
      </CurrencyProvider>
    )
}

describe('search tests', () => {

  it('returns a function', () => {
    const func = search(jest.fn())

    expect(typeof func).toEqual('function')
  })

  it('gets the correct input', () => {
    document.getElementById = jest.fn(() => HTMLInputElement)
    HTMLInputElement.value = ''

    const func = search(jest.fn())
    func()

    expect(document.getElementById).toHaveBeenCalledWith('searchField')
  })

  it('search for lowercase only', () => {
    HTMLInputElement.value = 'ETH'
    document.getElementById = jest.fn(() => HTMLInputElement)
    const setCurrency = jest.fn()

    const func = search(setCurrency)
    func()

    expect(setCurrency).toHaveBeenCalledWith('eth')

  })

  it('calls setCurrency for a valid value and reset searchField', () => {
    const setCurrency = jest.fn()
    HTMLInputElement.value = 'eth'
    document.getElementById = jest.fn(() => HTMLInputElement)

    const func = search(setCurrency)
    func()

    expect(setCurrency).toHaveBeenCalled()
    expect(HTMLInputElement.value).toEqual('')
  })

  it('wont call setCurrency for a invalid value and show a message', () => {
    const setCurrency = jest.fn()
    HTMLInputElement.value = 'invalid'
    document.getElementById = jest.fn(() => HTMLInputElement)

    const func = search(setCurrency)
    func()

    expect(setCurrency).not.toHaveBeenCalled()
    expect(HTMLInputElement.placeholder).toEqual('Termo inválido')
    expect(HTMLInputElement.value).toEqual('')
  })
})

describe('<TopBar /> tests', () => {
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

  it('call search when search button is clicked', async () => {
    const mockSearch = jest.fn()
    TopBar.__Rewire__('search', mockSearch)

    testRender()

    fireEvent.click(screen.getByAltText('search button'))
    expect(mockSearch).toHaveBeenCalled()

    TopBar.__ResetDependency__('search')

    // Check if the fetch data is rendered
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  it('renders without crashing', async () => {
    const tree = testRender()

    expect(tree).toMatchSnapshot()

    // Check if the fetch data is rendered
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })


})
