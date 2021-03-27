import React, { useContext, useEffect, useState } from 'react';

import { CurrencyContext } from '../contexts/CurrencyContext'

import bitcoin_logo from '../images/bitcoin_logo.svg'
import styles from '../styles/components/InfoCard.module.css'

export default function InfoCard() {
    const {
        currency,
        vol,
        closing,
        volBRL
    } = useContext(CurrencyContext)

    const [volOut, setVolOut] = useState()
    const [closingOut, setClosingOut] = useState()
    const [volBRLOut, setVolBRLOut] = useState()

    useEffect(() => {
        volHandler(vol)
        closingHandler(closing)
        volBRLHandler(volBRL)
    }, [currency])

    function volHandler(rawVol) {
        rawVol = Math.trunc(rawVol * 100) / 100

        var volInt
        var volDecimal
        [ volInt, volDecimal ] = String(rawVol).split('.')

        if (typeof(volDecimal) == 'undefined') {
            volDecimal = '0'
        }
        setVolOut(volInt + ',' + volDecimal.padEnd(2, '0'))
    }

    function closingHandler(rawClosing) {
        rawClosing = Math.round(rawClosing) / 1000

        var closingInt
        var closingDecimal
        [ closingInt, closingDecimal ] = String(rawClosing).split('.')

        if (typeof(closingDecimal) == 'undefined') {
            closingDecimal = '0'
        }

        setClosingOut(closingInt + '.' + closingDecimal.padEnd(3, '0'))
    }

    function volBRLHandler(rawVol) {
        console.log(rawVol)
        // const vol = rawVol.toLocaleString('pt-br', {
        //     style: 'currency',
        //     currency: 'BRL',
        //     minimumFractionDigits: 2
        // })
        const vol = rawVol
        setVolBRLOut(vol)
    }

    return(
        <div id='infocard' className={styles.infoCardContainer}>
            <header className={styles.header}>
                <div>
                    <img src={bitcoin_logo} alt='bitcoin logo'></img>
                </div>
                <div id='price' className={styles.price}>
                    R$ {closingOut}
                </div>
            </header>
            <div>
                <p id='volume'>
                    {volOut} bitcoins negociados nas últimas 24hs
                </p>
                <p id='total'>
                    Um total de R$ {volBRLOut}
                </p>
                <div>
                    Veja mais ->
                </div>
            </div>
        </div>
    );
};

