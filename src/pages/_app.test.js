import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './_app';

it('renders without crashing', () => {
    render(<App />)
});
