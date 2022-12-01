/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(user: string, pass: string): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
