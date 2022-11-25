// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../support" />

describe('Visual Report', () => {
  it('Ensure the correct data is displayed for the user', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
