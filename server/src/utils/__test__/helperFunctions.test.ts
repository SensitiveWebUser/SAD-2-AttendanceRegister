import helper from '../helperFunctions';

const firstName = 'steve';
const middleName = 'middle';
const lastName = 'last';

describe('format name tests', () => {
  it('returns expected name', () => {
    const result = helper.formatName(firstName, middleName, lastName);

    expect(result).toBe(`${firstName} ${middleName} ${lastName}`);
  });

  it('returns expected name', () => {
    const result = helper.formatName(firstName, '', lastName);

    expect(result).toBe(`${firstName} ${lastName}`);
  });
});
