import { useAuth0 } from '@auth0/auth0-react';
import { Container, Grid } from '@mui/material';
import { roles } from '../../utils/constants';
import { CheckStudent } from './CheckStudent';
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance';

export const Attendance = () => {
  const { isAuthenticated, user } = useAuth0();

  const role = isAuthenticated
    ? user['http://sad.assignment.com/userData'].app.role
    : roles.GUEST;

  return (
    <Container
      maxWidth={false}
      sx={{
        p: { xs: 10 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          {isAuthenticated && role === roles.STUDENT ? (
            <RegisterAttendance />
          ) : (
            <CheckStudent />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
