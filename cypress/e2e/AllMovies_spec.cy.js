describe("Rancid Tomatillos user interface", () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
      fixture: "../fixtures/allmovies.json"
    })
    cy.visit("http://localhost:3000")
  })
  
  it("should show the title", () => {
    cy.contains("Rancid Tomatillos")
  })

  it("should show a heading that says `Movies` and includes a drop down filter menu", () => {
    cy.contains(".section--all-movies", "Movies")
    cy.contains(".section--all-movies", "Filter by rating:")
    cy.get('select[name="filter-movies"]')
      .select(1)
      .invoke("val")
      .should("eq", "two-stars")
  });

  it("should show a collection of movies", () => {
    cy.get('.container--movie-cards').should('exist')
    cy.get('.movie-cards').should('have.length', 4)
      .should('be.visible')
    cy.get('.image').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")  
    cy.get('.image').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")  
    cy.get('.image').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")  
    cy.get('.image').eq(3).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg")  
  })
})
