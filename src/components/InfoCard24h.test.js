import React from 'react'
import { render, screen } from '@testing-library/react'

import CurrencyProvider from '../contexts/CurrencyContext'

import InfoCard24h from './InfoCard24h'

describe('<InfoCard24h /> tests', () => {
  it('renders without crashing', () => {
    render(
      <CurrencyProvider>
        <InfoCard24h />
      </CurrencyProvider>
    )
  })
})
