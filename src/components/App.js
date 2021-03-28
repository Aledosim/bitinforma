import React from 'react';

import TopBar from './TopBar';
import InfoCard from './InfoCard';
import InfoCard24h from './InfoCard24h';
import Background from './Background'

import CurrencyProvider from '../contexts/CurrencyContext'

import styles from '../styles/components/App.module.css';

function App(pageProps) {

    return (
        <CurrencyProvider>
          <div className={styles.appContainer}>
            <div className={styles.topBarContainer}>
                <TopBar />
            </div>
            <div className={styles.backgroundContainer}>
                <Background />
            </div>
            <div className={styles.cardsContainer}>
              <InfoCard />
              <InfoCard24h />
            </div>
          </div>
        </CurrencyProvider>
    );
  }

export default App;
