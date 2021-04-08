import React, { useContext } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import { search } from '../functions/functions'
import styles from '../styles/components/TopBar.module.css'

import logo from "../images/logo.svg"
import search_icon from '../images/search_icon.svg'

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
          data-cy='searchField'
          id='searchField'
          type='text'
          placeholder='Buscar por uma moeda'
        />
        <img
          data-cy='searchButton'
          src={search_icon}
          alt='search button'
          onClick={search(setCurrency)}
        />
      </div>
    </header>
  );
};
