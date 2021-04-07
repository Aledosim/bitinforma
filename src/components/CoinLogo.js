import React from 'react'

import styles from '../styles/components/CoinLogo.module.css'
import { configs } from '../configs'

import coinLogo from '../images/coin/btc.svg'

export default function CoinLogo(props) {

    return(
        <div className={styles.logoContainer}>
            <span>
                <img src={coinLogo} alt='coin logo'></img>
            </span>
            <span>
                {configs.currencies[props.currency]}
            </span>
        </div>
    )
}

