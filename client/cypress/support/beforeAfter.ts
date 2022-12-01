import './commands';
import Users from './testUsers';
export {};

before(() => {
  // root-level hook
  // runs once before all tests
});

beforeEach(() => {
  // root-level hook
  // runs before every test block
  cy.visit('/');
  cy.clearCookies({ domain: null });

  const testUser = Cypress.currentTest.titlePath[0];
  let user: string;
  let pass: string;

  for (const [key, value] of Object.entries(Users)) {
    if (key === testUser) {
      user = value.user;
      pass = value.pass;
    }
  }

  cy.login(user, pass);
});

afterEach(() => {
  // runs after each test block
});

after(() => {
  // runs once all tests are done
});
