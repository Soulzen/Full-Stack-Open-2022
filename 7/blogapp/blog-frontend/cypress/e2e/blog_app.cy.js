describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Alberto',
      name: 'Alberto',
      password: 'alberto'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login in to aplication')
  })

  describe('Login', function () {
    it('Login successful', function () {
      cy.get('#username').type('Alberto')
      cy.get('#password').type('alberto')
      cy.get('#loginButton').click()
      cy.wait(500)
      cy.contains('Alberto logged in')
    })
    it('Login unsuccessful', function () {
      cy.get('#username').type('Alberto')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error').contains('Unable to log in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Alberto', password: 'alberto' })
    })

    it('Create New Blog', function () {
      cy.contains('New Blog').click()
      cy.get('#titleInput').type('Test Title')
      cy.get('#authorInput').type('Test Author')
      cy.get('#urlInput').type('www.TestUrl.com')
      cy.get('.createBlogButton').click()

      cy.contains('Test Title')
    })

    describe('When there are Blogs', function () {
      beforeEach(function () {
        let newBlog = {
          title: 'API Title',
          author: 'API Author',
          url: 'APIUrl.com',
          likes: 0,
          user: {
            username: 'Alberto',
            name: 'Alberto'
          }
        }
        cy.createBlog(newBlog)

        newBlog = {
          title: 'API Title 2',
          author: 'API Author 2',
          url: 'APIUrl2.com',
          likes: 0,
          user: {
            username: 'Alberto',
            name: 'Alberto'
          }
        }

        cy.createBlog(newBlog)
      })

      it('Like Blog', function () {
        cy.contains('API Title').contains('show').click()
        cy.contains('API Title').parent().contains('Like').click()

        cy.contains('Likes: 1')
      })

      it('Owner can delete a Blog', function () {
        cy.contains('API Title 2').contains('show').click()
        cy.contains('API Title 2').parent().contains('Delete').click()

        cy.contains('API Title 2').should('not.exist')
      })

      it('Blogs should be sorted by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'API Title')
        cy.get('.blog').eq(1).should('contain', 'API Title 2')
        cy.contains('API Title').contains('show').click()
        cy.contains('API Title').parent().contains('Like').click()
        cy.contains('API Title 2').contains('show').click()
        cy.contains('API Title 2').parent().contains('Like').click()
        cy.wait(500)
        cy.contains('API Title 2').parent().contains('Like').click()
        cy.wait(500)
        cy.get('.blog').eq(0).should('contain', 'API Title 2')
        cy.get('.blog').eq(1).should('contain', 'API Title')
      })
    })
  })
})
