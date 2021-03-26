import React from 'react';
import { render, screen } from '@testing-library/react';
import XMLHttpRequestMock from 'xmlhttprequest-jest-mock';

import InfoCard,{ request } from './InfoCard.js';

describe('<InfoCard /> tests', () => {
    it('renders without crashing', () => {
        render(<InfoCard />)
    });
})

