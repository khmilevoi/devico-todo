import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'dux';

import { logger } from 'middlewares/logger';
import { useSocket } from 'middlewares/useSocket';

import { socketListener } from 'utils/socketListener';
import { socket } from 'utils/socket';

import { configureStore } from 'store/configureStore';
import { initialState } from 'constants/initialState';

import App from 'App';

import 'styles/index.scss';

const store = useSocket(configureStore(initialState), socketListener, socket);
store.subscribe(logger());

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root'),
);
