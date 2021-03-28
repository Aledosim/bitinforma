it('Gus first impressions', () => {
    cy.intercept(/mercadobitcoin/).as('mercado_request')

    // Gus wants to know about bitcoin and visits BitInforma home page
    cy.visit('/')

    // He notes the the topbar with the BitInforma logo and the search field
    cy.get('#topbar').should('be.visible')
    cy.get('#topbar').find('img[class*="logo"]').should('be.visible')
    cy.get('#topbar').get('#searchField').should('be.visible')

    // The logo is on the right side and the search field is at the center
    // logodiv.should('have.css', 'align-self', 'flex-start')

    // He notes the two cards and the background as well
    cy.get('#infocard').should('be.visible')
    cy.get('#infocard24h').should('be.visible')

    //cy.get('#background').should('be.visible')

    // Gus reads the bitcoin price
    cy.wait('@mercado_request').should(() => {

        cy.get('#price').should('be.visible')

        cy.get('#price').should(($div) => {
            const text = $div.text()

            expect(text).to.match(/^R\$\s\d+\.\d{3}$/)
        })

        // and then reads the last 24h information
        cy.get('#volume').should(($p) => {
            const text = $p.text()

            expect(text).to.match(/^\d+,\d{2}\sbitcoins\snegociados\snas\súltimas\s24hs$/)
        })

        cy.get('#total').should(($p) => {
            const text = $p.text()

            expect(text).to.match(/Um\stotal\sde\sR\$\s\d+(\.\d{3})*,\d{2}$/)

        })
    })
})

