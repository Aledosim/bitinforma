import React from 'react';
import { render, screen } from '@testing-library/react';

import InfoCard from './InfoCard.js';

it('renders without crashing', () => {
    render(<InfoCard />)
});
