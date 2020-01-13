// @flow

import type { Middleware, Thunk } from 'types/dux';

export const thunk: Middleware<Thunk> = ({ dispatch }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch);
  }

  return next(action);
};
