import React from 'react'
import { render, screen } from '@testing-library/react'

import CurrencyProvider from '../../contexts/CurrencyContext'

import InfoCard, { volHandler, closingHandler, volBRLHandler } from '../../components/InfoCard'

describe('volHandler tests', () => {
  it('should return a function', () => {
    const setVolOut = jest.fn()

    const func = volHandler(setVolOut)

    expect(typeof func).toEqual('function')
  });

  it('should return the formated sting', () => {
    const func = volHandler()
    const result = func('159.91613864')

    expect(result).toEqual("159,91")
  });

});

describe('closingHandler tests', () => {
  it('should return a function', () => {
    const func = closingHandler()

    expect(typeof func).toEqual('function')
  });

  it('should return the sting formated value', () => {
    const func = closingHandler()
    const result = func('326900.00666999')

    expect(result).toEqual("326.900")
  });

  it('should return the correct value if the input ends with 0', () => {
    const func = closingHandler()
    const result = func('326000.00666999')

    expect(result).toEqual("326.000")
  });

});

describe('volBRLHandler tests', () => {
  it('should return a function', () => {
    const func = volBRLHandler()

    expect(typeof func).toEqual('function')
  });

  it('should return the string formated value', () => {
    const func = volBRLHandler()
    const result = func(41198719.10154287)

    expect(result).toEqual("R$ 41.198.719,10")
  });

});

describe('<InfoCard /> tests', () => {
  it('renders without crashing', () => {
    render(
      <CurrencyProvider>
        <InfoCard />
      </CurrencyProvider>
    )
  })
})

