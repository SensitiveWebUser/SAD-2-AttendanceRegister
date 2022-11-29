/// <reference types="cypress" />
export {};

Cypress.Commands.add('login', (user: string, pass: string) => {
  console.log(user, pass);

  cy.get('[data-testid="MenuIcon"]').click();
  cy.get('[data-testid="loginButton"]').click();
  cy.get('#username').click().type(user);
  cy.get('#password').click().type(pass);
  cy.get('[type="submit"]').click();
  cy.url().should('contain', 'profile');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="MenuIcon"]').click();
  cy.get('[data-testid="logoutButton"]').click();
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
