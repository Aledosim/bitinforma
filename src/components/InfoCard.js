import React, { useContext, useEffect, useState } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import coinLogo from '../images/coins/btc.svg'

import styles from '../styles/components/InfoCard.module.css'

export default function InfoCard() {

    const {
        vol,
        closing,
        volBRL,
        currencyName
    } = useContext(CurrencyContext)

    const [volOut, setVolOut] = useState()
    const [closingOut, setClosingOut] = useState()
    const [volBRLOut, setVolBRLOut] = useState()

    useEffect(() => volHandler(vol), [vol])
    useEffect(() => closingHandler(closing), [closing])
    useEffect(() => volBRLHandler(volBRL), [volBRL])

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
        const vol = rawVol.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        })
        setVolBRLOut(vol)
    }

    return(
        <div id='infocard' className={styles.infoCardContainer}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <span>
                        <img src={coinLogo} alt='coin logo'></img>
                    </span>
                    <span>
                        {currencyName}
                    </span>
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
                    Um total de {volBRLOut}
                </p>
                <div>
                    <a href='https://www.mercadobitcoin.com.br/negociacoes'>Veja mais -></a>
                </div>
            </div>
        </div>
    )
}

