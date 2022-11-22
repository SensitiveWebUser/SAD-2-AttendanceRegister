import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { App } from '../../components/App';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';

import { CssBaseline, ThemeProvider } from '@mui/material';

import darkTheme from '../../utils/themes/Dark';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      hideIconVariant
      preventDuplicate
      transitionDuration={{ exit: 200, enter: 200 }}
      autoHideDuration={3500}
    >
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </SnackbarProvider>,
    div
  );
});
