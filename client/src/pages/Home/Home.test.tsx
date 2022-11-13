import React from 'react';
import { render } from '@testing-library/react';

import { Home } from './Home';

describe('<Home />', () => {
  test("should display a blank Home with the text 'TEST PAGE'", async () => {
    <Home />;
  });
});
