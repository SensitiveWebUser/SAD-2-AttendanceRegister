import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';

import { Home } from './pages';

const App = (): JSX.Element => (
  <Suspense
    fallback={
      <>
        <LinearProgress /> <h1>Loading...</h1>
      </>
    }
  >
    <Home />
  </Suspense>
);

export default App;
