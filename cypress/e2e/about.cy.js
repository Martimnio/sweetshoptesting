import loc from "../../../sweetshop/cypress/locators/locators.js"
const data = require(`../../../sweetshop/cypress/fixtures/loginData.json`)

describe('About page', () => {
  it('Clicking on the About button on the nav should redirect the user to the about page', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.get(loc.about_button).click()
    cy.url().should('eq', 'https://sweetshop.netlify.app/about')
    cy.get('.display-3').should('contain','Sweet Shop Project')
    cy.get('.my-4 > :nth-child(2)').should('contain','An intentionally broken web application to help demonstrate Chrome DevTools.')
    cy.get('.my-4 > :nth-child(3)').should('contain','Sweet Shop is a project created to help demonstrate some of the great features of the Chrome DevTools')
  })
})