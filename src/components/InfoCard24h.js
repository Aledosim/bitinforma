import React, { useContext } from 'react';

import { CurrencyContext } from '../contexts/CurrencyContext'

import up_arrow from '../images/up_arrow.svg'
import down_arrow from '../images/down_arrow.svg'
import price_tag from '../images/price_tag.svg'
import price_up from '../images/price_up.svg'
import price_down from '../images/price_down.svg'
import bitcoin_logo from '../images/bitcoin_logo.svg'
import styles from '../styles/components/InfoCard24h.module.css'

export default function InfoCard24h(){

    const {
        high,
        low,
        last,
        buy,
        sell
    } = useContext(CurrencyContext)

    return(
        <div id='infocard24h' className={styles.infoCard24hContainer}>
            <header className={styles.header}>
                <div>
                    <img src={bitcoin_logo} alt='bitcoin logo'></img>
                </div>
                <div>Nas ultimas 24h</div>
            </header>
            <div className={styles.content}>
                <p>
                    <span>
                        <img src={up_arrow} alt='seta para cima'></img>
                    </span>
                    <span>
                        Maior preço negociado:
                    </span>
                    <span>
                        {high}
                    </span>
                </p>
                <p>
                    <span>
                        <img src={down_arrow} alt='seta para baixo'></img>
                    </span>
                    <span>
                        Menor preço negociado:
                    </span>
                    <span>
                        {low}
                    </span>
                </p>
                <p>
                    <span>
                        <img src={price_tag} alt='etiqueta de preço'></img>
                    </span>
                    <span>
                        Preço da última negociação:
                    </span>
                    <span>
                        {last}
                    </span>
                </p>
                <p>
                    <span>
                        <img src={price_up} alt='preço subindo'></img>
                    </span>
                    <span>
                        Menor preço de oferta de venda:
                    </span>
                    <span>
                        {sell}
                    </span>
                </p>
                <p>
                    <span>
                        <img src={price_down} alt='preço descendo'></img>
                    </span>
                    <span>
                        Maior preço de oferta de compra:
                    </span>
                    <span>
                        {buy}
                    </span>
                </p>

            </div>
        </div>
    );
};


