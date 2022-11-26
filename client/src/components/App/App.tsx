import { Login } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { Fragment, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import { Home } from '../../pages';
import { NotFound } from '../../pages/NotFound';
import { Header } from '../Header';
import { Report } from '../../pages/Report';

export const App = (): JSX.Element => (
  <Suspense
    fallback={
      <Fragment>
        <LinearProgress /> <h1>Loading...</h1>
      </Fragment>
    }
  >
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<NotFound />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Outlet />
    </Router>
  </Suspense>
);
