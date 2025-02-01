import loc from "../locators/locators.js"
const data = require(`../fixtures/loginData.json`)

describe('Login page', () => {

  describe('Login feature', ()=>{
    it('After the login is completed, the user should be redirected to the "Your account" page', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.login(data.email, data.password)
      cy.get('.display-3').should('contain','Your Account')
    })

    it.only('Try to login with no credencials should inform the user the lack of information', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.get(loc.login_button_nav).click()
      cy.contains('button','Login').click()
      cy.get(':nth-child(1) > .invalid-feedback').should("contain","Please enter a valid email address.")
      cy.get(':nth-child(2) > .invalid-feedback').should("contain","Please enter a valid password.")
    })
  })

  describe('Ordering table', () => {
    it('The table should be correctly ordenated when clicking on Order number', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.login(data.email, data.password)
      cy.get('.order-number').click()
      cy.get('tbody > :nth-child(1) > th').should("contain","#1")
      cy.get(':nth-child(2) > th').should("contain","#2")
      cy.get(':nth-child(3) > th').should("contain","#3")
      
      cy.get('.order-number').click()
      cy.get('tbody > :nth-child(1) > th').should("contain","#3")
      cy.get(':nth-child(2) > th').should("contain","#2")
      cy.get(':nth-child(3) > th').should("contain","#1")
    })

    it('The table should be correctly ordenated when clicking on Date Ordered', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.login(data.email, data.password)
      cy.get('.order-date').click()
      cy.get('tbody > :nth-child(1) > :nth-child(2)').should("contain","1st December 2019")
      cy.get('tbody > :nth-child(2) > :nth-child(2)').should("contain","11th July 2019")
      cy.get(':nth-child(3) > :nth-child(2)').should('contain',"11th Feb 2019")

      cy.get('.order-date').click()
      cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain',"11th Feb 2019")
      cy.get('tbody > :nth-child(2) > :nth-child(2)').should("contain","11th July 2019")
      cy.get(':nth-child(3) > :nth-child(2)').should("contain","1st December 2019")
    })

    it('The table should be correctly ordenated when clicking on Order description', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.login(data.email, data.password)
      cy.get('.order-description').click()
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should('contain',"Sherbert Straws x 1")
      cy.get('tbody > :nth-child(2) > :nth-child(3)').should('contain','Swansea Mixture x 1')
      cy.get(':nth-child(3) > :nth-child(3)').should('contain',"Chocolate Cups x 5")
      cy.get(':nth-child(3) > :nth-child(3)').should('contain',"Swansea Mixture x 2")
    })

    it('The table should be correctly ordenated when clicking on Order Total', () => {
      cy.visit('https://sweetshop.netlify.app/')
      cy.login(data.email, data.password)
      cy.get('.order-total').click()
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain',"8.00")
      cy.get('tbody > :nth-child(2) > :nth-child(4)').should('contain',"1.50")
      cy.get(':nth-child(3) > :nth-child(4)').should('contain',"0.75")
      cy.get('.order-total').click()
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain',"0.75")
      cy.get('tbody > :nth-child(2) > :nth-child(4)').should('contain',"1.50")
      cy.get(':nth-child(3) > :nth-child(4)').should('contain',"8.00")
    })
  })
})