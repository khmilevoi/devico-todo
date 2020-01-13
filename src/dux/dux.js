// @flow

import type { CreateStore } from '../types/dux';

export const createStore: CreateStore = (
  reducer,
  initialState = {},
  middleware,
) => {
  let state = initialState;

  const listeners = [];

  if (middleware) {
    return middleware(createStore)(reducer, initialState);
  }

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);

      listeners.forEach((listener) => listener(action, state));

      return state;
    },
    subscribe: (listener) => {
      listeners.push(listener);

      return () => listeners.splice(listeners.indexOf(listener), 1);
    },
  };
};
