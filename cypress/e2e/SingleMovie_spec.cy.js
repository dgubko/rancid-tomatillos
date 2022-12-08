describe("Rancid Tomatillos single-movie user flow", () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
      fixture: "../fixtures/allmovies.json"
    })
    cy.visit("http://localhost:3000")
  })

  it('should show details about the movie when its card is clicked', () => {
    cy.get('a').eq(0).click()
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      method: "GET",
      fixture: "../fixtures/singlemovie.json"
    })
      .get('.single-page-container').should('be.visible')
      .get('.image').should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
      .get('.single-movie-description').should('contain', "Money Plane")
      .and('contain', "6.9").and('contain', "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.")

    cy.location().should((loc) => expect(loc.href).to.eq('http://localhost:3000/movies/694919'))
  })

  it('should show a different url in the address bard when a movie is clicked', () => {
    cy.get('a').eq(0).click()
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      method: "GET",
      fixture: "../fixtures/singlemovie.json"
    })
    cy.location().should((loc) => expect(loc.href).to.eq('http://localhost:3000/movies/694919'))
  })

  it('should show an error message when there is a network problem', () => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      method: "GET",
      fixture: ""
    })
    cy.get('a').eq(0).click()
    cy.visit("http://localhost:3000/movies/694919")
    cy.get('h4').contains("Couldn't communicate with the server. Try again later.")
  })

  it('should show an error message when the Go Back button is clicked and there is a network problem', () => {
    cy.get('a').eq(0).click()
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      method: "GET",
      fixture: "../fixtures/singlemovie.json"
    })
    cy.visit('http://localhost:3000/movies/694919')
    cy.get('.back-button').click()
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
      fixture: ""
    })
    
    cy.visit("http://localhost:3000/")
    cy.get('.text--error').contains("Couldn't communicate with the server. Try again later.")
  })
})
