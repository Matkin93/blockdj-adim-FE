/// <reference types="Cypress" />


describe('My First Test', function () {
    it('Does not do much!', function () {
        expect(true).to.equal(true)
    })
})

describe('My Second Test', function () {
    it('Visits the Maps page', function () {
        cy.visit('localhost:3002/map')
    })
})

// cy.visit(/map)
// cy.server()
// cy.route({
//         method: 'GET',      // Route all GET requests
//         url: '/cities/*',    // that have a URL that matches '/users/*'
//         response: []        // and force the response to be: []
//     })
