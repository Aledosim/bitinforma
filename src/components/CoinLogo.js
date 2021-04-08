import React, { useContext } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import { configs } from '../configs'
import styles from '../styles/components/CoinLogo.module.css'

import coinLogo from '../images/coins/btc.svg'

export function CoinLogo() {
  const {
    currency
  } = useContext(CurrencyContext)

  return(
    <div data-cy='coinlogo' className={styles.logoContainer}>
      <span>
        <img src={coinLogo} alt='coin logo'></img>
      </span>
      <span>
        {configs.currencies[currency]}
      </span>
    </div>
  )
}

