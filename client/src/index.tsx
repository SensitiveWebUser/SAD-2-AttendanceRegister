import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';

import { CssBaseline, ThemeProvider } from '@mui/material';

import darkTheme from './utils/themes/Dark';

ReactDOM.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={darkTheme}>
				<Auth0Provider
					domain={process.env.REACT_APP_AUTH0_DOMAIN}
					clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
					redirectUri={window.location.origin}
					audience={process.env.REACT_APP_AUTH0_AUDIENCE}
					scope="read:current_user update:current_user_metadata"
				>
					<CssBaseline />
					<App />
				</Auth0Provider>
			</ThemeProvider>
		</I18nextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
