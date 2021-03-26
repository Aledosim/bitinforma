import React, { useState, useEffect } from 'react';

import bitcoin_logo from '../images/bitcoin_logo.svg'
import styles from '../styles/components/InfoCard.module.css'

export default function InfoCard() {
    const [price, setPrice] = useState(0)

    function request() {
        const date = new Date(2021, 2, 25)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const url = `https://www.mercadobitcoin.net/api/BTC/day-summary/${year}/${month}/${day}/`

		fetch(url)
            .then(response => response.json())
            .then(data => {
                var rawPrice = data.avg_price
                rawPrice = Math.round(rawPrice) / 1000

                var priceInt
                var priceDecimal

                [ priceInt, priceDecimal ] = String(rawPrice).split('.')
                setPrice(priceInt + '.' + priceDecimal.padEnd(3, '0'))
            })
    }

    useEffect(request)

    return(
        <div id='infocard' className={styles.infoCardContainer}>
            <header className={styles.header}>
                <div>
                    <img src={bitcoin_logo} alt='bitcoin logo'></img>
                </div>
                <div id='price' className={styles.price}>
                    R$ {price}
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

