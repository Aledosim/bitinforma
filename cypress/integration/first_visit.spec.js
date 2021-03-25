it('successfully loads', () => {
    // Gus wants to know about bitcoin and visits BitInforma home page
    cy.visit('/')

    // He notes the the topbar with the BitInforma logo and the search field
    cy.get('#topbar').should('be.visible')
    cy.get('#topbar').find('img[class*="logo"]').should('be.visible')
    cy.get('#topbar').find('input[type="search"]').should('be.visible')

    // The logo is on the right side and the search field is at the center
    // logodiv.should('have.css', 'align-self', 'flex-start')

    // He notes the two cards and the background as well
    cy.get('#infocard').should('be.visible')
    cy.get('#infocard24h').should('be.visible')

    // Gus reads the bitcoin price
    cy.get('#price').should('be.visible')
    cy.get('#price').should(($div) => {
        const text = $div.text()

        expect(text).to.match(/^R\$\s[0-9]+\.[0-9]{3}$/)
    })

    // and then reads the last 24h information
})
