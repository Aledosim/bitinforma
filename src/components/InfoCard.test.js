import React from 'react';
import { render, screen } from '@testing-library/react';

import CurrencyProvider from '../contexts/CurrencyContext'

import InfoCard, { volHandler, closingHandler, volBRLHandler } from './InfoCard';

describe('volHandler tests', () => {
  it('should return a function', () => {
    const setVolOut = jest.fn()

    const func = volHandler(setVolOut)

    expect(typeof func).toEqual('function')
  });

  it('should call setVolOut with the correct value', () => {
    const setVolOut = jest.fn()

    const func = volHandler(setVolOut)
    func('159.91613864')

    expect(setVolOut).toHaveBeenCalledWith("159,91")
  });

});

describe('closingHandler tests', () => {
  it('should return a function', () => {
    const setClosingOut = jest.fn()

    const func = closingHandler(setClosingOut)

    expect(typeof func).toEqual('function')
  });

  it('should call setClosingOut with the correct value', () => {
    const setClosingOut = jest.fn()

    const func = closingHandler(setClosingOut)
    func('326900.00666999')

    expect(setClosingOut).toHaveBeenCalledWith("326.900")
  });

  it('should call setClosingOut with the correct value that ends with 0', () => {
    const setClosingOut = jest.fn()

    const func = closingHandler(setClosingOut)
    func('326000.00666999')

    expect(setClosingOut).toHaveBeenCalledWith("326.000")
  });

});

describe('volBRLHandler tests', () => {
  it('should return a function', () => {
    const setVolBRLOut = jest.fn()

    const func = volBRLHandler(setVolBRLOut)

    expect(typeof func).toEqual('function')
  });

  it('should call setVolBRLOut with the correct value', () => {
    const setVolBRLOut = jest.fn()

    const func = volBRLHandler(setVolBRLOut)
    func(41198719.10154287)

    expect(setVolBRLOut).toHaveBeenCalledWith("R$ 41.198.719,10")
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

