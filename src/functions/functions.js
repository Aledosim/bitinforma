import { configs } from '../configs'

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

