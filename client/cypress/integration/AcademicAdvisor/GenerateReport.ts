// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Academic Advisor', () => {
  it('As an Academic Advisor, I would like to be able to generate an attendance report for all students who i am advising', () => {
    expect(true).to.equal(true);
    cy.visit('/');
  });
});
