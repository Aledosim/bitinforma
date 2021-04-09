import React, { useContext } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import { configs } from '../configs'
import styles from '../styles/components/TopBar.module.css'

import logo from "../images/logo.svg"
import search_icon from '../images/search_icon.svg'

export function search(setCurrency) {
  const searchInner = () => {
    const searchField  = document.getElementById('searchField')
    const text = searchField.value.toLowerCase()

    if (Object.keys(configs.currencies).includes(text)) {
      setCurrency(text)
      searchField.value = ''
    } else {
      searchField.value = ''
      searchField.placeholder = 'Termo inválido'
    }
  }

  return searchInner
}

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
