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

        // <img
        //   data-cy='searchButton'
        //   src={search_icon}
        //   alt='search button'
        //   onClick={search(setCurrency)}
        // />
  return(
    <header data-cy='topbar' className={styles.topBar}>
      <div>
        <img className={styles.logo} src={logo} alt='logo' />
      </div>
      <div className={styles.searchFieldContainer}>
        <input
          data-cy='searchField'
          id='searchField'
          type='text'
          placeholder='Buscar por uma moeda'
        />
        <i class="fas fa-search" />
      </div>
    </header>
  );
};
