import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import CurrencyProvider from '../../contexts/CurrencyContext'

import TopBar, { search } from '../../components/TopBar'

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
  it('renders without crashing', () => {

    render(
      <CurrencyProvider>
        <TopBar />
      </CurrencyProvider>
    )

    const logo = screen.getByAltText('logo')
    expect(logo.hasAttribute('src')).toBe(true)

    const searchField = screen.getByPlaceholderText('Buscar por uma moeda')
    expect(searchField.getAttribute('id')).toBe('searchField')
    expect(searchField.getAttribute('type')).toBe('text')

    const searchButton = screen.getByAltText('search button')
    expect(searchButton.hasAttribute('src')).toBe(true)

  })
})
