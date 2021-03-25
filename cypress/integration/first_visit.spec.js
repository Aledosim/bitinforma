it('successfully loads', () => {
    // Gus wants to know about bitcoin and visits BitInforma home page
    cy.visit('/')

    // He notes the the topbar with the BitInforma logo and the search field
    const topbar = cy.get('#topbar')
    topbar.should('be.visible')

    const logo = topbar.find('img[src$="logo.svg"]')
    logo.should('be.visible')

    // The logo is on the right side and the search field is at the center
    const logodiv = logo.parent()
    // logodiv.should('have.css', 'align-self', 'flex-start')
    // He notes the two boxes and the background as well
    // Gus reads the bitcoin price
    // and then reads the last 24h information
})
