// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Tutor', () => {
  it('As a Tutor, I would like to be able to generate an attendance report for all students part of my course', () => {
    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[data-testid="reportButton"]').click();
    cy.get('#courseID').type('643e6d09-275e-4bf9-8566-4910f5994413');
    cy.get('[data-testid="download"]').click();
    cy.get('#notistack-snackbar').should('have.text', 'Success!');
  });
});
