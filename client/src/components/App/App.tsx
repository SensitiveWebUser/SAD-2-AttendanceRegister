import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Fragment, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Admin, Home, NotFound } from '../../pages';
import { roles } from '../../utils/constants';
import { Attendance } from '../../pages/Attendance';
import { Header } from '../Header';

export const App = (): JSX.Element => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const role = isAuthenticated
    ? user['http://sad.assignment.com/userData'].app.role
    : roles.GUEST;

  return isLoading ? (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography variant="h4" color="primary.main" mb={4}>
          Loading...
        </Typography>
        <CircularProgress />
      </Grid>
    </Container>
  ) : (
    <Suspense
      fallback={
        <Fragment>
          <Container />
        </Fragment>
      }
    >
      <Router>
        <Header role={role} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="*" element={<NotFound />} />
          {role === roles.ADMIN && <Route path="admin" element={<Admin />} />}
        </Routes>
        <Outlet />
      </Router>
    </Suspense>
  );
};
