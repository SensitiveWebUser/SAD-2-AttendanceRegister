import { Login } from '@mui/icons-material';
import { Container, LinearProgress, Typography } from '@mui/material';
import { Fragment, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Home, NotFound } from '../../pages';
import { Header } from '../Header';

export const App = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Fragment>
          <Container>
            {/* Would've used {t('loading.message')} here but can't due react not rendering it */}
            <LinearProgress /> <Typography>Loading...</Typography>
          </Container>
        </Fragment>
      }
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </Router>
    </Suspense>
  );
};
