import React, { useContext } from 'react';

import logo from "../images/logo.svg"
import styles from '../styles/components/TopBar.module.css'

import { CurrencyContext } from '../contexts/CurrencyContext'

export default function TopBar(){
    const {
        search
    } = useContext(CurrencyContext)

    return(
        <header id='topbar' className={styles.topBar}>
            <span>
                <img className={styles.logo} src={logo} alt='logo'></img>
            </span>
            <span className={styles.searchFieldContainer}>
                <input id='searchField' type='search' name='searchField'></input>
                <input type='button' name='searchField' onClick={search}></input>
            </span>
        </header>
    );
};
