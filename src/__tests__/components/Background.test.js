import React from 'react'
import { render, screen } from '@testing-library/react'

import Background from '../../components/Background'

describe('<Background /> tests', () => {
  it('renders without crashing', () => {
    render(<Background />)
  });
})
