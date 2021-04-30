import React, { useContext } from 'react'

import { CurrencyContext } from '../contexts/CurrencyContext'

import { configs } from '../configs'
import styles from '../styles/components/TopBar.module.css'

import logo from "../images/logo.svg"

export function search(setCurrency) {
  const searchInner = (event) => {
    const searchField  = document.getElementById('searchField')
    const text = searchField.value.toLowerCase()

    if (Object.keys(configs.currencies).includes(text)) {
      setCurrency(text)
      searchField.value = ''
    } else {
      searchField.value = ''
      searchField.placeholder = 'Termo inválido'
    }
    event.preventDefault()
  }

  return searchInner
}

export default function TopBar(){

  const {
    setCurrency
  } = useContext(CurrencyContext)
        // <input
        //   data-cy='searchField'
        //   id='searchField'
        //   type='text'
        //   placeholder='Buscar por uma moeda'
        // />

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
      <form
        onSubmit={search(setCurrency)}
        className={styles.searchFieldContainer}
      >
        <input
          type='search'
          autoComplete='on'
          autoSave='true'
          placeholder='Buscar por uma moeda'
          id='searchField'
          data-cy='searchField'
        />
        <button
          type='submit'
          className="fas fa-search"
          data-cy='searchButton'
        />
      </form>
    </header>
  );
};
