it('Gus wants to search for other cryptocoins', () => {
    cy.intercept(/mercadobitcoin/).as('mercado_request')

    // Gus already knows BitInforma, so he came back for more info
    cy.visit('/')

    cy.wait('@mercado_request').should(() => {

        // He notes the price of bitcoin
        cy.get('#price').then(($div) => {

            const firstPrice = $div.text()

            // Imediately he tries writing some search term
            cy.get('#topbar').get('#searchField').type('ETH')
                .then(() => {

                    // ...and hit the search button
                    cy.get('#topbar').get('#searchField').click()

                })
                .wait('@mercado_request').should(() => {

                    // Gus now sees the difference in prices
                    cy.get('#price').its('text').should('not.be.equal', firstPrice)

                    // And the price is formated accordingly
                    cy.get('#price').should(($div) => {
                        const text = $div.text()

                        expect(text).to.match(/^R\$\s\d+\.\d{3}$/)
                    })

            })

        })

    })
})

