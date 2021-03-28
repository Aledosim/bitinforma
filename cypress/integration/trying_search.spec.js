it('Gus wants to search for other cryptocoins', () => {
    cy.intercept(/\/ticker/).as('ticker')

    // Gus already knows BitInforma, so he came back for more info
    cy.visit('/')

    cy.wait('@ticker').should(() => {

        // He notes the price of bitcoin
        cy.get('#price').then(($div) => {

            const firstPrice = $div.text()

            // Imediately he tries writing some search term
            cy.get('#topbar').get('input#searchField').type('ETH')
                .then(() => {

                    // ...and hit the search button
                    cy.get('#topbar').get('img#searchField').click()

                })
                .wait('@ticker').should(() => {

                    // Gus now sees the difference in prices
                    cy.get('#price').its('text').should('not.be.equal', firstPrice)
                    // and in the currency name
                    // cy.get('#logo')

                    // And the price is formated accordingly
                    cy.get('#price').should(($div) => {
                        const text = $div.text()

                        expect(text).to.match(/^R\$\s\d+\.\d{3}$/)
                    })

            })

        })

    })
})

