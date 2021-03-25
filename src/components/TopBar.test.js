import React from 'react';
import { render, screen } from '@testing-library/react';

import TopoBar from './TopBar';

fit('renders without crashing', () => {
    render(<TopoBar />)
});
