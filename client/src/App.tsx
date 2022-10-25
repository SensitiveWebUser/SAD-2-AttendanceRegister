import React, { Suspense } from 'react';

import { Home } from './pages';

const App = (): JSX.Element => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <Home />
  </Suspense>
);

export default App;
