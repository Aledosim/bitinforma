import React, { useState, useEffect, createContext } from 'react';

const coins = [
    'ACMFT',
    'ACORDO01',
    'ASRFT',
    'ATMFT',
    'BCH',
    'BTC',
    'CAIFT',
    'CHZ',
    'ETH',
    'GALFT',
    'IMOB01',
    'JUVFT',
    'LINK',
    'LTC',
    'MBCONS01',
    'MBCONS02',
    'MBFP01',
    'MBFP02',
    'MBPRK01',
    'MBPRK02',
    'MBPRK03',
    'MBPRK04',
    'MBVASCO01',
    'MCO2',
    'OGFT',
    'PAXG',
    'PSGFT',
    'USDC',
    'WBX',
    'XRP',
]

export const CurrencyContext = createContext()

export default function CurrencyProvider({children}) {
    const [currency, setCurrency] = useState('BTC')
    const [high, setHigh] = useState('0')
    const [low, setLow] = useState('0')
    const [vol, setVol] = useState('0')
    const [last, setLast] = useState('0')
    const [buy, setBuy] = useState('0')
    const [sell, setSell] = useState('0')
    const [closing, setClosing] = useState('0')
    const [volBRL, setVolBRL] = useState('0')

    useEffect(update, [currency])

    function search() {
        const searchField  = document.getElementById('searchField')
        const text = searchField.value.toUpperCase()

        if (coins.includes(text)) {
            setCurrency(text)
            searchField.value = ''
        } else {
            searchField.value = ''
            searchField.placeholder = 'Termo inválido'
        }
    }

    function update() {
        const ticker = `https://www.mercadobitcoin.net/api/${currency}/ticker/`

        fetch(ticker)
            .then(response => response.json())
            .then(data => {
                setHigh(data.ticker.high)
                setLow(data.ticker.low)
                setVol(data.ticker.vol)
                setLast(data.ticker.last)
                setBuy(data.ticker.buy)
                setSell(data.ticker.sell)
            })

        const date = new Date()
        date.setDate(date.getDate() - 1)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const summary = `https://www.mercadobitcoin.net/api/${currency}/day-summary/${year}/${month}/${day}/`

        fetch(summary)
            .then(response => response.json())
            .then(data => {
                setClosing(data.closing)
                setVolBRL(data.volume)
            })
    }

    return(
        <CurrencyContext.Provider value={{
            high,
            low,
            vol,
            last,
            buy,
            sell,
            closing,
            volBRL,
            search
        }}>
            {children}
        </CurrencyContext.Provider>
    )
}
