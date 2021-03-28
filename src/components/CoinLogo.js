import React from 'react'

import styles from '../styles/components/CoinLogo.module.css'

export default function CoinLogo() {
    return(
        <div className={styles.logoContainer}>
            <span>
                <img src={coinLogo} alt='coin logo'></img>
            </span>
            <span>
                {currencyName}
            </span>
        </div>
    )
}

