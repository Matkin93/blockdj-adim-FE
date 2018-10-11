/// <reference types="Cypress" />


describe('My First Test', function () {
    it('Making sure Cypress works!', function () {
        expect(true).to.equal(true)
    })
})

describe('My Second Test', () => {
    it('Visits the Maps page', () => {
        cy.visit('localhost:3000/map')
    })
})

describe('My Third Test', () => {
    it('Accepts typed area name', () => {
        const typedText = 'Victoria'
        cy.get('.area-name')
            .type(typedText)
            .should('have.value', typedText)
    })
})

describe('Entering an image url', () => {
    it('Accepts an image url', () => {
        const imageAddress = 'http://news.images.itv.com/image/file/881858/stream_img.jpg'
        cy.get('.image-url')
            .type(imageAddress)
            .should('have.value', imageAddress)
    })
})

describe('drawing a polygon', () => {
    it('clicks to draw a polygon', () => {
        cy.get('.leaflet-draw-draw-polygon').click()
        cy.get('.map-div').click(15, 40).click(30, 40).click(30, 60).click(15, 60).click(15, 40)
    })
})

describe('Form submission', () => {
    it('Clicks submit button', () => {
        cy.get('.submit-button').click()
    })
})
