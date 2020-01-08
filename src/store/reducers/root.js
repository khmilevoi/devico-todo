import { combineReducers } from '../../dux';

import { todosReducer } from './todo';
import { authReducer } from './auth';
import { errorReducer } from './error';

export const root = combineReducers({
  todos: todosReducer,
  auth: authReducer,
  error: errorReducer,
});
