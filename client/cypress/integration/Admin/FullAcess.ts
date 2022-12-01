// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Admin', () => {
  it('As an Admin, I would like to be able to have full access to ths system', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
