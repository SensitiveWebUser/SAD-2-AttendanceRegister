import { Suspense } from 'react';
import { Header } from './components/Header/Header';
import { Home } from './pages';
import { LinearProgress } from '@mui/material';

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
