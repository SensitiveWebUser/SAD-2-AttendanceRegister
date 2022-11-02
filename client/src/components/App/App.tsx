import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Header } from '../Header';
import { Home } from '../../pages/Home';

export const App = (): JSX.Element => (
  <Suspense
    fallback={
      <>
        <LinearProgress /> <h1>Loading...</h1>
      </>
    }
  >
    <Header />
    <Home />
  </Suspense>
);
