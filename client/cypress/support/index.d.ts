/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(user: object): Chainable<Element>;
  }
}
