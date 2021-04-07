import React, { useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'

import styles from '../styles/components/CoinLogo.module.css'
import { configs } from '../configs'

import coinLogo from '../images/coin/btc.svg'

export default function CoinLogo() {
  const {
    currency
  } = useContext(CurrencyContext)

  return(
    <div className={styles.logoContainer}>
      <span>
        <img src={coinLogo} alt='coin logo'></img>
      </span>
      <span>
        {configs.currencies[currency]}
      </span>
    </div>
  )
}

