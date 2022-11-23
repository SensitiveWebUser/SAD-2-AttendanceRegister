import { Admin } from '../Admin';

const adminTestData = {
  id: '1',
  type: '1',
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: '',
};

const _admin = new Admin(
  adminTestData.id,
  adminTestData.type,
  adminTestData.firstName,
  adminTestData.middleName,
  adminTestData.lastName,
  adminTestData.email
);

describe('Admin model', () => {
  it('has a module', () => {
    expect(_admin).toBeDefined();
  });
});
