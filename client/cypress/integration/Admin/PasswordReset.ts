// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Admin', () => {
  it('As an Admin, I would like to be able to force a password reset for a user', () => {
    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[data-testid="adminButton"]').click();
    cy.scrollTo('bottom');
    cy.get('#userId').click().type('auth0|6386776b841043dd7a9e4da1');
    cy.get('#password').click().type('moduleleader123');
    cy.get('#passwordConfirm').click().type('moduleleader123');
  });
});
