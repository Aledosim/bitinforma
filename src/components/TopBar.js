import React, { useContext } from 'react';

import logo from "../images/logo.svg"
import search_icon from '../images/search_icon.svg'

import styles from '../styles/components/TopBar.module.css'

import { CurrencyContext } from '../contexts/CurrencyContext'

export default function TopBar(){
    const {
        search
    } = useContext(CurrencyContext)

    return(
        <header id='topbar' className={styles.topBar}>
            <div>
                <img className={styles.logo} src={logo} alt='logo'></img>
            </div>
            <div className={styles.searchFieldContainer}>
                <input
                    id='searchField'
                    type='text'
                    name='searchField'
                    placeholder='Buscar por uma moeda'
                />
                <img
                    id='searchField'
                    src={search_icon}
                    alt='search button'
                    onClick={search}
                />
            </div>
        </header>
    );
};
