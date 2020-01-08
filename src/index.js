import { configureStore } from 'store/configureStore';

import { initialState } from 'constants/initialState';
import { logIn } from 'store/actions/auth';

import 'index.css';

const store = configureStore(initialState);

store.subscribe((...args) => console.log(args));


store.dispatch(logIn('Karina', '12345'));
