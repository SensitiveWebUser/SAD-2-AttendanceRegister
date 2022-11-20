import { Login } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { Fragment, Suspense } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';

import { Home } from '../../pages';
import { NotFound } from '../../pages/NotFound';

export const App = (): JSX.Element => (
  <Suspense
    fallback={
      <Fragment>
        <LinearProgress /> <h1>Loading...</h1>
      </Fragment>
    }
  >
    <Router location={''} navigator={undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </Router>
  </Suspense>
);
