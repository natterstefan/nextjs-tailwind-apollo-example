describe('TodoApp', () => {
  it('creates and deletes a new Todo', () => {
    // go to homepage
    cy.visit('http://localhost:3000')

    // create todo
    cy.get('form').get('input').type('New Todo')
    cy.get('form').submit()
    cy.get('form').get('input').should('be.empty')

    // check that new todo exists
    cy.contains('New Todo')

    // remove the todo
    cy.contains('Remove').click()

    // check that the todo is gone
    cy.contains('New Todo').should('not.exist')
  })

  it('creates and mark a todo as done', () => {
    // go to homepage
    cy.visit('http://localhost:3000')

    // create todo
    cy.get('form').get('input').type('New Todo')
    cy.get('form').submit()

    cy.get(':checkbox').click()
    cy.get(':checkbox').should('be.checked')
  })
})
