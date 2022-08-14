describe('Blog App', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/testing/reset',
    })

    cy.request({
      url: 'http://localhost:3000/api/users',
      method: 'POST',
      body: { username: 'seheray', name: 'seher', password: 'supret' },
    })
    cy.request({
      url: 'http://localhost:3000/api/users',
      method: 'POST',
      body: { username: 'utkuay', name: 'utku', password: 'supret' },
    })

    cy.visit('http://localhost:3000')
  })

  describe('login functionality', () => {
    it('login page open', () => {
      cy.contains('Login')
      cy.get('input[name="username"]')
      cy.get('input[name="password"]')
    })

    it('login succes', () => {
      cy.get('input[name="username"]').type('seheray')
      cy.get('input[name="password"]').type('supret')
      cy.get('button[type="submit"]').click()
      cy.contains('logged in')
    })

    it('login unsuccess', () => {
      cy.get('input[name="username"]').type('seheray')
      cy.get('input[name="password"]').type('wrong')
      cy.get('button[type="submit"]').click()
      cy.get('.info-container').contains('Invalid credentials')
      cy.get('.info-text').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.info-container').should(
        'have.css',
        'border',
        '3px solid rgb(255, 0, 0)'
      )
    })
  })

  describe('logged in functionality', () => {
    beforeEach(() => {
      cy.login({ username: 'seheray', password: 'supret' })
    })

    it('can create blog', () => {
      cy.contains('add blog').click()
      cy.get('input[name="title"]').type('seher')
      cy.get('input[name="url"]').type('seher.com')
      cy.get('input[name="author"]').type('seheray')
      cy.get('button[type="submit"]').click()

      cy.contains('show').click()
      cy.contains('seher.com')
    })

    describe('with multiple blog added', () => {
      beforeEach(() => {
        cy.addBlog({ title: 'seher', author: 'seheray', url: 'seher.com' })
        cy.addBlog({ title: 'utku', author: 'utkuay', url: 'utku.com' })
        cy.addBlog({ title: 'mahmut', author: 'mahmutay', url: 'mahmut.com' })
        cy.visit('http://localhost:3000')
      })

      it('like a blog', () => {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('likes').contains('2')
      })

      it('delete a blog', () => {
        cy.contains('show').click()
        cy.contains('hide').parent().parent().parent().as('blogToDelete')
        cy.get('@blogToDelete').contains('remove').click()
      })

      it('can not delete anothe user', () => {
        cy.contains('Logout').click()
        cy.get('input[name="username"]').type('utkuay')
        cy.get('input[name="password"]').type('supret')
        cy.get('button[type="submit"]').click()
        cy.contains('logged in')

        cy.contains('show').click()
        cy.contains('hide').parent().parent().parent().as('blogToDelete')
        cy.get('@blogToDelete').contains('remove').click()

        cy.contains('Not authorized to remove this blog')
      })
    })
  })
})
