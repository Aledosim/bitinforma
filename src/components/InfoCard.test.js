import React from 'react';
import { render, screen } from '@testing-library/react';
import XMLHttpRequestMock from 'xmlhttprequest-jest-mock';

import CurrencyProvider from '../contexts/Currency'
import InfoCard from './InfoCard';

describe('<InfoCard /> tests', () => {
    it('renders without crashing', () => {
        render(<CurrencyProvider><InfoCard /></CurrencyProvider>)
})

