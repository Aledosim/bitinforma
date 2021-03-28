import React from 'react'

import styles from '../styles/components/CoinLogo.module.css'

import coinLogo from '../images/coin/btc.svg'
export default function CoinLogo(props) {

    return(
        <div className={styles.logoContainer}>
            <span>
                <img src={coinLogo} alt='coin logo'></img>
            </span>
            <span>
                {props.currencyName}
            </span>
        </div>
    )
}

