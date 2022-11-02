import { Suspense } from 'react';
import { Header } from './components/Header/Header';
import { Home } from './pages';

const App = (): JSX.Element => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <Header />
    <Home />
  </Suspense>
);

export default App;
