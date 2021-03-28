import React, { useState, useEffect, createContext, useContext } from 'react'

import { CurrencyContext } from './CurrencyContext'

export const InfoContext = createContext()

export default function InfoProvider({children}) {

    const { currency } = useContext(CurrencyContext)

    const [coinLogoPath, setcoinLogoPath] = useState('../images/coins/btc.svg')

    return(

        <InfoContext.Provider value={{
            coinLogoPath
        }}>
            {children}
        </InfoContext.Provider>
    )
}

