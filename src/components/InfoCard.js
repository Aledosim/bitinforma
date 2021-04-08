import React, { useContext, useEffect, useState } from 'react';

import { CurrencyContext } from '../contexts/CurrencyContext'

import { CoinLogo } from './CoinLogo'
import styles from '../styles/components/InfoCard.module.css'

export function volHandler (setVolOut) {

  const volHandlerInner = rawVol => {
    rawVol = Math.trunc(rawVol * 100) / 100

    var volInt
    var volDecimal
    [ volInt, volDecimal ] = String(rawVol).split('.')

    if (typeof(volDecimal) == 'undefined') {
      volDecimal = '0'
    }
    setVolOut(volInt + ',' + volDecimal.padEnd(2, '0'))
  }

  return volHandlerInner
}

export function closingHandler (setClosingOut) {

  const closingHandlerInner = rawClosing => {
    rawClosing = Math.round(rawClosing) / 1000

    var closingInt
    var closingDecimal
    [ closingInt, closingDecimal ] = String(rawClosing).split('.')

    if (typeof(closingDecimal) == 'undefined') {
      closingDecimal = '0'
    }

    setClosingOut(closingInt + '.' + closingDecimal.padEnd(3, '0'))
  }

  return closingHandlerInner
}

export function volBRLHandler (setVolBRLOut) {

  const volBRLHandlerInner = rawVol => {
    const vol = rawVol.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })
    setVolBRLOut(vol)
  }

  return volBRLHandlerInner
}

export default function InfoCard() {

    const {
        vol,
        closing,
        volBRL,
    } = useContext(CurrencyContext)

    const [volOut, setVolOut] = useState()
    const [closingOut, setClosingOut] = useState()
    const [volBRLOut, setVolBRLOut] = useState()

    useEffect(() => {
      const effect = volHandler(setVolOut)
      effect(vol)
    })
    useEffect(() => {
      const effect = closingHandler(setClosingOut)
      effect(closing)
    }, [closing])
    useEffect(()=> {
      const effect = volBRLHandler(setVolBRLOut)
      effect(volBRL)
    }, [volBRL])

    return(
        <div data-cy='infocard' className={styles.infoCardContainer}>
            <header className={styles.header}>
                <CoinLogo />
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
    );
};

