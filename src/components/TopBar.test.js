import React from 'react';
import { render, screen } from '@testing-library/react';

import CurrencyProvider from '../contexts/CurrencyContext'
import TopBar from './TopBar';

function renderTopBar() {
    return render(
        <CurrencyProvider>
            <TopBar />
        </CurrencyProvider>
    )
}

describe('<TopBar /> tests', () => {

    it('renders without crashing', () => {
        renderTopBar()
    });
})
