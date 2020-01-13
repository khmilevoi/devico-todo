import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'dux';

import { logger } from 'middlewares/logger';

import { configureStore } from 'store/configureStore';
import { initialState } from 'constants/initialState';

import App from 'components/App';

import 'styles/index.scss';

const store = configureStore(initialState);
store.subscribe(logger());

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root'),
);
