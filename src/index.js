import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'shared/Component';

import { logger } from 'middlewares/logger';

import { configureStore } from 'store/configureStore';
import { initialState } from 'constants/initialState';

// import { App } from 'components/App';

import 'styles/index.scss';

const store = configureStore(initialState);
store.subscribe(logger());

// const app = new App(store, document.body);
// document.body.append(mount(app));

const App = () => <div>Hello</div>;

ReactDOM.render(<App></App>, document.getElementById('root'));
