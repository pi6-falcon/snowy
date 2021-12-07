describe('Short a link', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Fail trying to short not a link', () => {
    cy.get('#long-url').type('not a link').should('have.value', 'not a link')
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('not.exist')
  })

  it('Try to short a link without auth', () => {
    cy.get('#long-url').type('http://youtube.com/').should('have.value', 'http://youtube.com/')
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('contain.value', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com')
  })


  it('Try to short a link twice link without auth', () => {
    cy.get('#long-url').type('http://youtube.com/').should('have.value', 'http://youtube.com/')
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('contain.value', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com')
    cy.get('#long-url').clear().should('have.value', '')
    cy.get('#long-url').type('http://google.com/').should('have.value', 'http://google.com/')
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('not.exist')
  })

  it('Try to short a link with auth', () => {
    cy.login()
    cy.get('#long-url').type('http://youtube.com/').should('have.value', 'http://youtube.com/')
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('contain.value', 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com')
  })

  it('Try to short a link (custom) with auth', () => {
    const customURL = random(5)
    cy.login()
    cy.get('#long-url').type('http://youtube.com/').should('have.value', 'http://youtube.com/')
    cy.get('#custom-url').type(customURL).should('have.value', customURL)
    cy.get('#submit-shorten').submit()
    cy.get('#short-url').should('contain.value', `http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/${customURL}`)
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
