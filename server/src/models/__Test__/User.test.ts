//like student

import { User } from '../User';

import { userTestData } from './userTestData';

const _user = new User(userTestData);

describe('User Model', () => {
  it('has a module', () => {
    expect(_user).toBeDefined();
  });
});

// Test user getter and setter methods
describe('User model getter and setter methods', () => {
  it('getId method returns the correct id', () => {
    expect(_user.getId()).toEqual(userTestData.userId);
  });

  it('getUserType method returns the correct user type', () => {
    expect(_user.getUserType()).toEqual(userTestData.userTypeId);
  });

  it('getFirstName method returns the correct first name', () => {
    expect(_user.getFirstName()).toEqual(userTestData.firstName);
  });

  it('getMiddleName method returns the correct middle name', () => {
    expect(_user.getMiddleName()).toEqual(userTestData.middleName);
  });

  it('getLastName method returns the correct last name', () => {
    expect(_user.getLastName()).toEqual(userTestData.lastName);
  });

  it('getName method returns the correct name', () => {
    expect(_user.getName()).toEqual(
      `${userTestData.firstName} ${userTestData.middleName} ${userTestData.lastName}`
    );
  });

  it('getEmail method returns the correct email', () => {
    expect(_user.getEmail()).toEqual(userTestData.email);
  });

  it('setFirstName method sets the correct first name', () => {
    const firstName = 'Jane';
    _user.setFirstName(firstName);
    expect(_user.getFirstName()).toEqual(firstName);
  });

  it('setMiddleName method sets the correct middle name', () => {
    const middleName = 'B';
    _user.setMiddleName(middleName);
    expect(_user.getMiddleName()).toEqual(middleName);
  });

  it('setLastName method sets the correct last name', () => {
    const lastName = 'Doe';
    _user.setLastName(lastName);
    expect(_user.getLastName()).toEqual(lastName);
  });

  it('setEmail method sets the correct email', () => {
    const email = 'Jane@localhost.com';
    _user.setEmail(email);
    expect(_user.getEmail()).toEqual(email);
  });

  it('setName method sets the correct name', () => {
    const firstName = 'Ben';
    const middleName = 'A';
    const lastName = 'Smith';
    _user.setName(firstName, middleName, lastName);
    expect(_user.getName()).toEqual(`${firstName} ${middleName} ${lastName}`);
  });
});

//TODO: Add data into database and test the methods
/*

// Test user methods
describe('User model methods', () => {
  it('toJson method returns the correct json', () => {
    _user.setName(
      userTestData.firstName,
      userTestData.middleName,
      userTestData.lastName
    );
    _user.setEmail(userTestData.email);

    expect(_user.toJson()).toEqual(JSON.stringify(userTestData));
  });
});
*/
