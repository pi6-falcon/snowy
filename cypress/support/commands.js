// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.visit('/')
    cy.get('#customarea').click()
    cy.intercept('POST', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/auth').as('authUser')
    cy.get('#username').type(Cypress.env('username')).should('have.value', Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password')).should('have.value', Cypress.env('password'))
    cy.get('#submit-auth').submit()
    cy.wait('@authUser').should(({ request, response }) => {
        console.log(response)
        expect(response.statusCode).to.eq(200)
    })
})
