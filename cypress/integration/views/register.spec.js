describe('Create a new User', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Try create a new user', () => {
    cy.intercept('POST', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/user').as('postUser')
    Cypress.env('username', random(5))
    Cypress.env('password', random(5))
    cy.get('#username').type(Cypress.env('username')).should('have.value', Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password')).should('have.value', Cypress.env('password'))
    cy.get('#submit-register').submit()
    cy.wait('@postUser').should(({ request, response }) => {
      console.log(response)
      expect(response.statusCode).to.eq(201)
    })
  })

  it('Try to create an existing user', () => {
    cy.intercept('POST', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/user').as('postUser')
    cy.get('#username').type(Cypress.env('username')).should('have.value', Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password')).should('have.value', Cypress.env('password'))
    cy.get('#submit-register').submit()
    cy.wait('@postUser').should(({ request, response }) => {
      console.log(response)
      expect(response.statusCode).to.eq(409)
    })
  })
})

const random = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
}
