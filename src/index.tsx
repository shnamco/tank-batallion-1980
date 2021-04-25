import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.pcss';
import './index.pcss';
import { App } from './app';
import { Provider } from 'react-redux';
import { store } from '@store/core/store';

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
