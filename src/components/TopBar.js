import React from 'react';

import logo from "../images/logo.svg"
import styles from '../styles/components/TopBar.module.css'

export default function TopBar(){
    return(
        <header id='topbar' className={styles.topBar}>
            <span>
                <img className={styles.logo} src={logo} alt='logo'></img>
            </span>
            <span className={styles.searchFieldContainer}>
                <input type='search' name='searchField'></input>
                <input type='button' name='searchField'></input>
            </span>
        </header>
    );
};
