import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

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
    const event = jest.fn()
    const mockPreventDefault = jest.fn()
    event.preventDefault = mockPreventDefault

    document.getElementById = jest.fn(() => HTMLInputElement)
    HTMLInputElement.value = ''

    const func = search(jest.fn())
    func(event)

    expect(document.getElementById).toHaveBeenCalledWith('searchField')
  })

  it('search for lowercase only', () => {
    const event = jest.fn()
    const mockPreventDefault = jest.fn()
    event.preventDefault = mockPreventDefault

    HTMLInputElement.value = 'ETH'
    document.getElementById = jest.fn(() => HTMLInputElement)
    const setCurrency = jest.fn()

    const func = search(setCurrency)
    func(event)

    expect(setCurrency).toHaveBeenCalledWith('eth')

  })

  it('calls setCurrency for a valid value and reset searchField', () => {
    const event = jest.fn()
    const mockPreventDefault = jest.fn()
    event.preventDefault = mockPreventDefault

    const setCurrency = jest.fn()
    HTMLInputElement.value = 'eth'
    document.getElementById = jest.fn(() => HTMLInputElement)

    const func = search(setCurrency)
    func(event)

    expect(setCurrency).toHaveBeenCalledWith('eth')
    expect(HTMLInputElement.value).toEqual('')
  })

  it('wont call setCurrency for a invalid value and show a message', () => {
    const event = jest.fn()
    const mockPreventDefault = jest.fn()
    event.preventDefault = mockPreventDefault

    const setCurrency = jest.fn()

    document.getElementById = jest.fn(() => HTMLInputElement)
    HTMLInputElement.value = 'invalid'

    const func = search(setCurrency)
    func(event)

    expect(setCurrency).not.toHaveBeenCalled()
    expect(HTMLInputElement.placeholder).toEqual('Termo inválido')
    expect(HTMLInputElement.value).toEqual('')
  })

  it('calls event.disableDefault method to prevent page reload', () => {
    const event = jest.fn()
    const mockPreventDefault = jest.fn()
    event.preventDefault = mockPreventDefault

    HTMLInputElement.value = ''
    document.getElementById = jest.fn(() => HTMLInputElement)

    const func = search()
    func(event)

    expect(mockPreventDefault).toHaveBeenCalled()
  });
})

describe('<TopBar /> tests', () => {

  it('call search when search button is clicked', async () => {
    const mockInnerSearch = jest.fn()
    const mockSearch = jest.fn(() => mockInnerSearch)
    TopBar.__Rewire__('search', mockSearch)

    testRender()

    // The click event flow for forms is not implemented on jsdom
    // https://github.com/jsdom/jsdom/issues/1937
    fireEvent.submit(screen.getByRole('button'))
    expect(mockInnerSearch).toHaveBeenCalled()

    TopBar.__ResetDependency__('search')

    // Check if the fetch data is rendered to prevent unwanted errors
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  it('renders without crashing', async () => {
    const tree = testRender()

    expect(tree).toMatchSnapshot()

    // Check if the fetch data is rendered to prevent unwanted errors
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })


})
