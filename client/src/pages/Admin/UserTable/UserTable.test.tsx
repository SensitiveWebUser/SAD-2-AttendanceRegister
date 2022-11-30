import { UserTable } from './UserTable';

describe('<UserTable />', () => {
  test('Should render the UserTable component with no row data', async () => {
    <UserTable rows={[]} />;
  });
  test('Should render the UserTable component with some', async () => {
    <UserTable
      rows={[
        {
          id: 'auth0|def',
          type: 'Student',
          firstName: 'Alex',
          middleName: '',
          lastName: 'Alexis',
          email: '2@localhost.com',
        },
        {
          id: 'auth0|ghi',
          type: 'Module Leader',
          firstName: '7',
          middleName: '8',
          lastName: '9',
          email: '3@localhost.com',
        },
        {
          id: 'auth0|jkl',
          type: 'Course Leader',
          firstName: '10',
          middleName: '11',
          lastName: '12',
          email: '4@localhost.com',
        },
        {
          id: 'auth0|mno',
          type: 'Academic Advisor',
          firstName: '13',
          middleName: '14',
          lastName: '15',
          email: '5@localhost.com',
        },
        {
          id: 'auth0|pqr',
          type: 'Administrator',
          firstName: '16',
          middleName: '17',
          lastName: '18',
          email: '6@localhost.com',
        },
        {
          id: 'auth0|abc',
          type: 'Administrator',
          firstName: 'Adam',
          middleName: '',
          lastName: 'Edmunds',
          email: 'adam@mightylordx.uk',
        },
      ]}
    />;
  });
});
