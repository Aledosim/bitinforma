import React from 'react'
import { render } from '@testing-library/react'

import Background from '../../components/Background'

describe('<Background /> tests', () => {
  it('renders without crashing', () => {
    const tree = render(<Background />)

    expect(tree).toMatchSnapshot()
  });
})
