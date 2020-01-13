// @flow

import type { Reducer } from 'types/dux';

import { combineReducers } from 'dux';

import { todosReducer } from './todo';
import { authReducer } from './auth';
import { errorReducer } from './error';
import { localStorageReducer } from './localStorage';

export const root: Reducer = combineReducers({
  todos: todosReducer,
  auth: authReducer,
  error: errorReducer,
  ls: localStorageReducer,
});
