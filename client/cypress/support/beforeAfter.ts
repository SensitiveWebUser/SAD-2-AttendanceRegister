import './commands';
import user from './testUsers';

before(() => {
  // root-level hook
  // runs once before all tests
});

beforeEach(() => {
  cy.visit('/');
  cy.login(user.admin);
  // root-level hook
  // runs before every test block
});

afterEach(() => {
  // runs after each test block
});

after(() => {
  // runs once all tests are done
});
