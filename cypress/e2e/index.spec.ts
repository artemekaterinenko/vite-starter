describe('Basic flow', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('Should render "Welcome Home!" message', () => {
    cy.visit('/')

    cy.contains('Welcome Home!')
  })
})
