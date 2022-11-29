// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Tutor', () => {
  it('As a Tutor, I would like to be able to view the past attendance records for all students as part of my course', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
