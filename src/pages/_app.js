import React from 'react';

import TopBar from '../components/TopBar';
import InfoCard from '../components/InfoCard';
import InfoCard24h from '../components/InfoCard24h';

import CurrencyProvider from '../contexts/CurrencyContext'

import styles from '../styles/pages/_app.module.css';

function App(pageProps) {
    return (
        <CurrencyProvider>
          <div className={styles.appContainer}>
            <TopBar />
            <section className={styles.cardsContainer}>
              <InfoCard />
              <InfoCard24h />
            </section>
          </div>
        </CurrencyProvider>
    );
  }

export default App;
