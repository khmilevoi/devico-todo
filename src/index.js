import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'dux';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

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
    <DndProvider backend={Backend}>
      <App></App>
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);
