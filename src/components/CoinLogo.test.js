import React from 'react';
import { render, screen } from '@testing-library/react';

import CoinLogo from './CoinLogo';

describe('<CoinLogo /> tests', () => {
    it('renders without crashing', () => {
        render(<CoinLogo />)
    });
})

