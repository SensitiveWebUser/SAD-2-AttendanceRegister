import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, Slide, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { App } from './components/App';
import i18n from './i18n';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import darkTheme from './utils/themes/Dark';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      hideIconVariant
      transitionDuration={{ exit: 200, enter: 200 }}
      autoHideDuration={3500}
    >
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkTheme}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin + '/profile'}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
            scope="read:current_user update:current_user_metadata"
          >
            <CssBaseline />
            <App />
          </Auth0Provider>
        </ThemeProvider>
      </I18nextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
