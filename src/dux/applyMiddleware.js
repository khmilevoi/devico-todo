// @flow

import type { ApplyMiddleware, Dispatch } from 'types/dux';

const compose = (...chain) => chain.reduce((prev, curr) => (...args) => prev(curr(args)));

export const applyMiddleware: ApplyMiddleware = (
  ...middlewares
) => (createStore) => (reducer, initialState) => {
  const store = createStore(reducer, initialState);

  let dispatch: Dispatch = () => ({});

  const middlewareAPI = {
    dispatch: (...args) => dispatch(...args),
  };

  const chain = middlewares.map((middleware) => middleware(middlewareAPI));
  dispatch = compose(...chain)(store.dispatch);

  return { ...store, dispatch };
};
