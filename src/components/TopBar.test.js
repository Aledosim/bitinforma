import React from 'react'
import { render, screen } from '@testing-library/react'

import CurrencyProvider from '../contexts/CurrencyContext'

import TopBar, { search } from './TopBar'

function renderTopBar () {
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
    HTMLInputElement.value = 'eth'
    document.getElementById = jest.fn(() => HTMLInputElement)
    const spy = jest.spyOn(String.prototype, 'toLowerCase')

    const func = search(jest.fn())
    func()

    expect(String.prototype.toLowerCase).toHaveBeenCalledTimes(1)

    spy.mockRestore()
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

  it('wont call setCurrency for a invalid value and show a mesage', () => {
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
    renderTopBar()
  })
})
