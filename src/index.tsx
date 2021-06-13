import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.pcss';
import './index.pcss';
import { App } from './app';
import { Provider } from 'react-redux';
import { store } from '@store/core/store';
import { register } from '@utils/service_worker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

register();
