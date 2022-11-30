import { roles } from '../../utils/constants';
import { Header } from './Header';

describe('<Header />', () => {
  test('Should render header component as an admin', async () => {
    <Header role={roles.ADMIN} />;
  });
  test('Should render header component as a guest', async () => {
    <Header role={roles.STUDENT} />;
  });
  test('Should render header component as a tutor', async () => {
    <Header role={roles.TUTOR} />;
  });
  test('Should render header component as a tutor', async () => {
    <Header role={roles.MODULE_LEADER} />;
  });
  test('Should render header component as a tutor', async () => {
    <Header role={roles.COURSE_LEADER} />;
  });
  test('Should render header component as a tutor', async () => {
    <Header role={roles.ACADEMIC_ADVISOR} />;
  });
  test('Should render header component as a tutor', async () => {
    <Header role={roles.GUEST} />;
  });
});
