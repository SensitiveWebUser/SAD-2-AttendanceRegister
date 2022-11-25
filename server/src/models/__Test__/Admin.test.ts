import { Admin } from '../Admin';

import { userTestData } from './userTestData';

const adminTestData = {
  ...userTestData,
};

const _admin = new Admin(adminTestData);

describe('Admin model', () => {
  it('has a module', () => {
    expect(_admin).toBeDefined();
  });
});
