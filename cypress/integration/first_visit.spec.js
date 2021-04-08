it('Gus first impressions', () => {

  // Gus wants to know about bitcoin and visits BitInforma home page
  cy.visit('/')

  // He notes the topbar with the BitInforma logo and the search field
  cy.dataCy('topbar')
    .should('be.visible')
    .within(($topbar) => {

      cy.get('input[type=text]')
        .should('be.visible')

      cy.get('img[alt*=search]')
        .should('be.visible')
    })

  // He notes the two cards and the background as well
  cy.dataCy('infocard')
    .should('be.visible')
    .within(($infocard) => {

      cy.get('header img')
        .should('be.visible')

      cy.get('header span:last-of-type')
        .should('contain', 'Bitcoin')
    })


  cy.dataCy('infocard24h')
    .should('be.visible')

  cy.dataCy('background')
    .should('be.visible')
})

