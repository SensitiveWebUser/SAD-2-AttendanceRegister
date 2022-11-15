import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { App } from '../components/App';
import i18n from '../i18n';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    div
  );
});
