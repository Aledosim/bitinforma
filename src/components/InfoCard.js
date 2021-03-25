import React from 'react';

import bitcoin_logo from '../images/bitcoin_logo.svg'
import styles from '../styles/components/InfoCard.module.css'

export default function InfoCard(){
    return(
        <div id='infocard' className={styles.infoCardContainer}>
            <header className={styles.header}>
                <div>
                    <img src={bitcoin_logo} alt='bitcoin logo'></img>
                </div>
                <div id='price' className={styles.price}>
                    R$ 309.449
                </div>
            </header>
            <div>
                <p>
                    300,30 bitcoins negociados nas últimas 24hs
                </p>
                <p>
                    Um total de R$ 91.615.809,16
                </p>
                <div>
                    Veja mais ->
                </div>
            </div>
        </div>
    );
};

