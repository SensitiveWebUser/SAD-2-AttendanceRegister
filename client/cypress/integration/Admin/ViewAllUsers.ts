// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Admin', () => {
  it('As an Admin, I would like to be able to view a list of all the users in the system', () => {
    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[data-testid="adminButton"]').click();
    cy.get('[data-testid="userTableHead"]').then(() => {
      cy.get('[data-testid="row-academic-advisor4@localhost.com"]').should(
        'contain',
        'academic-advisor4@localhost.com'
      );
    });
  });
});
