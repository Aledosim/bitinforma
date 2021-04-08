import React, { useState, useEffect, createContext } from 'react';

export const CurrencyContext = createContext()

export default function CurrencyProvider({children}) {
    const [currency, setCurrency] = useState('btc')
    const [high, setHigh] = useState('0')
    const [low, setLow] = useState('0')
    const [vol, setVol] = useState('0')
    const [last, setLast] = useState('0')
    const [buy, setBuy] = useState('0')
    const [sell, setSell] = useState('0')
    const [closing, setClosing] = useState('0')
    const [volBRL, setVolBRL] = useState('0')

    useEffect(update, [currency])

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
            currency,
            setCurrency
        }}>
            {children}
        </CurrencyContext.Provider>
    )
}
