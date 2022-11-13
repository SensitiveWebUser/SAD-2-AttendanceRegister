import React from 'react';
import { render } from '@testing-library/react';

import { Login } from './Login';

describe('<Login />', () => {
  test("should display a blank Login with the text 'TEST PAGE'", async () => {
    <Login />;
  });
});
