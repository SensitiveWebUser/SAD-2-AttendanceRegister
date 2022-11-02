import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Header } from './components/Header';
import { Home } from './pages';

const App = (): JSX.Element => (
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

export default App;
