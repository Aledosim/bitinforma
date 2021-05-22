it('Gus wants to search for other cryptocoins', () => {
  cy.intercept(/www.mercadobitcoin.net/).as('requests')

  // Gus already knows BitInforma, so he came back for more info
  cy.visit('/')

  cy.wait(['@requests', '@requests'])

  // He notes the price of bitcoin
  cy.dataCy('price').then(($priceDiv) => {

    const firstPrice = $priceDiv.text()

    // Imediately he tries writing some search term
    cy.dataCy('searchField')
      .type('ETH')

    // ...and hit the search button
    cy.dataCy('searchButton')
      .click()

    cy.wait(['@requests', '@requests'])

    // Gus now sees the difference in prices
    cy.dataCy('price')
      .invoke('text')
      .should('not.be.equal', firstPrice)

    // and in the currency name
    cy.dataCy('coinlogo').first().within(() => {
      cy.get('span:last-of-type')
        .invoke('text')
        .should('be.equal', 'Ethereum')
    })

  })

  // Just for fun Gus try to search a invalid term
  cy.dataCy('searchField')
    .type('bitcoin sucks')

  cy.dataCy('searchButton')
    .click()

  // He sees the error message
  cy.dataCy('searchField')
    .invoke('attr', 'placeholder')
    .should('be.equal', 'Termo inválido')
})

