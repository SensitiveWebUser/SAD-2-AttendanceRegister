// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Academic Advisor', () => {
  it('As an Academic Advisor, I would like to be able to view attendance records for a student i am advising over a period of time', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
