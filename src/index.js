import { logger } from 'middlewares/logger';

import { configureStore } from 'store/configureStore';
import { initialState } from 'constants/initialState';

import { App } from 'App';

import 'index.scss';

const store = configureStore(initialState);
store.subscribe(logger());

const app = new App(store, document.body);
document.body.append(app.mount());
