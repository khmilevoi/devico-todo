import { applyMiddleware, createStore, thunk } from '../dux';
import { root } from './reducers/root';


export const configureStore = (initialState) => {
  const store = createStore(root, initialState, applyMiddleware(thunk));

  return store;
};
