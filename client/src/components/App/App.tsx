import { useAuth0 } from '@auth0/auth0-react';
import { LinearProgress } from '@mui/material';
import { Fragment, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import { Home, NotFound, Profile } from '../../pages';
import { Header } from '../Header';

export const App = (): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  return (
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
          <Route
            path="/Attendance"
            element={isAuthenticated ? <Home /> : <NotFound />}
          />
          <Route
            path="/Report"
            element={isAuthenticated ? <Home /> : <NotFound />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </Router>
    </Suspense>
  );
};
