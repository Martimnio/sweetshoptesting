import loc from "../locators/locators.js"
const data = require(`../fixtures/loginData.json`)

/**
 * Custom Cypress command to log in to the application.
 *
 * @function login
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 *
 * @example
 * // Using the custom command in a test
 * cy.login('user@example.com', 'password123');
 *
 */
Cypress.Commands.add('login', (email, password) => {
  cy.get(loc.login_button_nav).click()
  cy.get('#exampleInputEmail').type(email)
  cy.get('#exampleInputPassword').type(password)
  cy.contains('button','Login').click()
})

Cypress.Commands.add('addItemToBasket', (email, password) => {
  cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
  cy.get('.badge').should("contain",1)
})