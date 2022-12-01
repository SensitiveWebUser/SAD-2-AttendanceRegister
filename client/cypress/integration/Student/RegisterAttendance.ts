// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Student', () => {
  it('As a Student, I would like to be able to register my attendance for a session using a 4 character code', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
