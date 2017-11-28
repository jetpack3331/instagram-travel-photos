import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.css';
import './scss/landing-page.scss';

import './style/font-awesome/css/font-awesome.min.css';
import './style/simple-line-icons/css/simple-line-icons.css';

import App from './view/app';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
