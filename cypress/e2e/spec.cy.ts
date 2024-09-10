describe('Site features', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain home page title', () => {
    cy.title().should('equal', 'Home page');
  })

  it('should contain play button', () => {
    cy.get('.btn-primary').contains('Play!');
  })

  it('should open game when clicked on play', () => {
    cy.get('.btn-primary').contains('Play!').click();
    
    cy.get('h3', { timeout: 100 }).contains('Who’s That Pokémon?');
    cy.get('h4.round').contains('Round: 1 / 10');
    cy.get('h4.points').contains('Points: 0');

    //next button to be disabled
    cy.get('body > app-root > section > app-home > div > div > div > div.row.pb-3 > div:nth-child(2) > div > button').should('be.disabled')
  })

})
