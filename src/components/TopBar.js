import React, { useContext } from 'react';

import { CurrencyContext } from '../contexts/CurrencyContext'

import logo from "../images/logo.svg"
import search_icon from '../images/search_icon.svg'

import styles from '../styles/components/TopBar.module.css'
import { search } from '../functions/functions'

export default function TopBar(){

  const {
    setCurrency
  } = useContext(CurrencyContext)

  return(
    <header data-cy='topbar' className={styles.topBar}>
      <div>
        <img className={styles.logo} src={logo} alt='logo'></img>
      </div>
      <div className={styles.searchFieldContainer}>
        <input
          id='searchField'
          type='text'
          placeholder='Buscar por uma moeda'
        />
        <img
          src={search_icon}
          alt='search button'
          onClick={search(setCurrency)}
        />
      </div>
    </header>
  );
};
