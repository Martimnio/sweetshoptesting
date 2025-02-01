import loc from "../locators/locators.js"
const data = require(`../fixtures/basketData.json`)

describe('Basket features', () => {
  beforeEach(()=>{
    cy.visit('https://sweetshop.netlify.app/')
  })

  it('A sweet should be added to the basket', () => {
    cy.addItemToBasket()
    cy.get('.badge').should("contain",1)
  })

  it('A sweet should be added to the basket and then deleted from it', () => {
        cy.addItemToBasket()
    cy.get('.badge').should("contain",1)
    cy.get(loc.basket_button_nav).click()
    cy.get('#basketCount').should('contain','1')
    cy.get('.small').click()
    cy.get('#basketCount').should('contain','0')
  })

  it('A sweet should be purchased successfuly', () => {
    cy.addItemToBasket()
    cy.get('.badge').should("contain",1)
    cy.get(loc.basket_button_nav).click()
    cy.get(loc.first_name).type(data.first_name)
    cy.get(loc.last_name).type(data.last_name)
    cy.get('#email').type(data.email)
    cy.get('#address').type(data.adress)
    cy.get('#country').select(data.country)
    cy.get('#city').select(data.city)
    cy.get('#zip').type(data.zip)
    cy.get('#cc-name').type(data.cc_name)
    cy.get('#cc-number').type(data.cc_number)
    cy.get('#cc-expiration').type(data.cc_expiration)
    cy.get('#cc-cvv').type(data.cc_cvv)
    cy.get(loc.checkout_button).click()
  })

  it("Click on checkout without informing all the necessary inputs results in a warning to the user", () => {

    const validation = [
      {selector: ":nth-child(1) > :nth-child(1) > .invalid-feedback", message:"Valid first name is required"},
      {selector: ":nth-child(1) > :nth-child(2) > .invalid-feedback", message:"Valid last name is required"},
      {selector: ".needs-validation > :nth-child(2) > .invalid-feedback", message:"Please enter a valid email address for shipping updates"},
      {selector: ".needs-validation > :nth-child(3) > .invalid-feedback", message:"Please enter your shipping address"},
      {selector: ".col-md-5 > .invalid-feedback", message:"Please select a valid country"},
      {selector: ".col-md-4 > .invalid-feedback", message:"Please provide a valid state"},
      {selector: ":nth-child(5) > .col-md-3 > .invalid-feedback", message:"Zip code required"},
      {selector: ":nth-child(8) > :nth-child(1) > .invalid-feedback", message:"Name on card is required"},
      {selector: ":nth-child(8) > :nth-child(2)", message:"Credit card number is required"},
      {selector: ":nth-child(9) > :nth-child(1)", message:"Expiration date required"},
      {selector: ":nth-child(9) > :nth-child(2)", message:"Security code required"}
    ]
    
    cy.addItemToBasket()
    cy.get('.badge').should("contain",1)
    cy.get(loc.basket_button_nav).click()
    cy.get(loc.checkout_button).click()
    
    validation.forEach(element => {
      cy.get(element.selector).should('contain',element.message)
    });
  })
})