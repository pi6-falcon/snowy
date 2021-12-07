describe('Auth', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#customarea').click()
  })

  it('Try auth user with valid information', () => {
    cy.intercept('POST', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/auth').as('authUser')
    cy.get('#username').type(Cypress.env('username')).should('have.value', Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password')).should('have.value', Cypress.env('password'))
    cy.get('#submit-auth').submit()
    cy.wait('@authUser').should(({ request, response }) => {
      console.log(response)
      expect(response.statusCode).to.eq(200)
    })
  })

  it('Try auth user with invalid information', () => {
    cy.intercept('POST', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/auth').as('authUser')
    cy.get('#username').type(Cypress.env('username')).should('have.value', Cypress.env('username'))
    cy.get('#password').type('invalid').should('have.value', 'invalid')
    cy.get('#submit-auth').submit()
    cy.wait('@authUser').should(({ request, response }) => {
      console.log(response)
      expect(response.statusCode).to.eq(401)
    })
  })
})
