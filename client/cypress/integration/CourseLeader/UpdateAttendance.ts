// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Course Leader', () => {
  it('As a Course Leader, I would like to be able to update an exisiting attendance record', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
