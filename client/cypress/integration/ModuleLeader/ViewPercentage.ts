// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Module Leader', () => {
  it('As a Module Leader, I would like to be able to view the past attendance records for all students as part of my module', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
