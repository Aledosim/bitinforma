import React, { useContext } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import { CoinLogo } from './CoinLogo'

import styles from '../styles/components/InfoCard.module.css'

export function volHandler () {

  const volHandlerInner = rawVol => {
    rawVol = Math.trunc(rawVol * 100) / 100

    var volInt
    var volDecimal
    [ volInt, volDecimal ] = String(rawVol).split('.')

    if (typeof(volDecimal) == 'undefined') {
      volDecimal = '0'
    }
    return volInt + ',' + volDecimal.padEnd(2, '0')
  }

  return volHandlerInner
}

export function closingHandler () {

  const closingHandlerInner = rawClosing => {
    rawClosing = Math.round(rawClosing) / 1000

    var closingInt
    var closingDecimal
    [ closingInt, closingDecimal ] = String(rawClosing).split('.')

    if (typeof(closingDecimal) == 'undefined') {
      closingDecimal = '0'
    }

    return closingInt + '.' + closingDecimal.padEnd(3, '0')
  }

  return closingHandlerInner
}

export function volBRLHandler () {

  const volBRLHandlerInner = rawVol => {
    const vol = rawVol.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })
    return vol
  }

  return volBRLHandlerInner
}

export default function InfoCard() {

  const {
    vol,
    closing,
    volBRL,
  } = useContext(CurrencyContext)

  return(
    <div data-cy='infocard' className={styles.infoCardContainer}>
      <header className={styles.header}>
        <CoinLogo />
        <div data-cy='price' className={styles.price}>
          R$ {closingHandler()(closing)}
        </div>
      </header>
      <div>
        <p id='volume'>
          {volHandler()(vol)} bitcoins negociados nas últimas 24hs
        </p>
        <p id='total'>
          Um total de {volBRLHandler()(volBRL)}
        </p>
        <div>
          <a href='https://www.mercadobitcoin.com.br/negociacoes'>Veja mais -></a>
        </div>
      </div>
    </div>
  );
};

