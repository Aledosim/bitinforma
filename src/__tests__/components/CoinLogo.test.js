import React from 'react'
import { render } from '@testing-library/react'

import CurrencyProvider from '../../contexts/CurrencyContext'

import { CoinLogo } from '../../components/CoinLogo'

describe('<CoinLogo /> tests', () => {
  it('renders without crashing', () => {
    render(
      <CurrencyProvider>
        <CoinLogo />
      </CurrencyProvider>
    )
  });
})

