import React, { useState, useEffect, createContext } from 'react'

const coins = {
    "acmft": "Fan Token ASR",
    "acordo01": "None",
    "asrft": "Fan Token ASR",
    "atmft": "Fan Token ATM",
    "bch": "Bitcoin Cash",
    "btc": "Bitcoin",
    "caift": "Fan Token CAI",
    "chz": "Chiliz",
    "eth": "Ethereum",
    "galft": "Fan Token GAL",
    "imob01": "None",
    "juvft": "Fan Token JUV",
    "link": "CHAINLINK",
    "ltc": "Litecoin",
    "mbcons01": "Cota de Consórcio 01",
    "mbcons02": "Cota de Consórcio 02",
    "mbfp01": "None",
    "mbfp02": "None",
    "mbprk01": "Precatório MB SP01",
    "mbprk02": "Precatório MB SP02",
    "mbprk03": "Precatório MB BR03",
    "mbprk04": "Precatório MB RJ04",
    "mbvasco01": "MBVASCO01",
    "mco2": "MCO2",
    "ogft": "Fan Token ASR",
    "paxg": "PAX Gold",
    "psgft": "Fan Token PSG",
    "usdc": "USD Coin",
    "wbx": "WiBX",
    "xrp": "XRP",
}

export const CurrencyContext = createContext()

export default function CurrencyProvider({children}) {
    const [currency, setCurrency] = useState('BTC')
    const [currencyName, setCurrencyName] = useState('Bitcoin')
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
        const text = searchField.value.toLowerCase()

        if (Object.keys(coins).includes(text)) {
            setCurrency(text)
            searchField.value = ''
        } else {
            searchField.value = ''
            searchField.placeholder = 'Utilize o código da moeda (ex. BTC, ETH, etc.)'
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

        setCurrencyName(coins[`${currency}`])
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
            search,
            currencyName
        }}>
            {children}
        </CurrencyContext.Provider>
    )
}
