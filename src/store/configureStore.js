import type { State, Store } from 'types/dux';

import { applyMiddleware, createStore, thunk } from 'dux';
import { root } from './reducers/root';

export const configureStore: State => Store = (initialState) => {
  const store = createStore(root, initialState, applyMiddleware(thunk));

  return store;
};
