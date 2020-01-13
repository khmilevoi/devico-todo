// @flow

import type { CombineReducers } from 'types/dux';

import { entries } from 'utils/entries';

export const combineReducers: CombineReducers = (object) => {
  const reducers = entries(object);

  return (state = {}, action) => {
    const newState = {};

    reducers.forEach(([name, reducer]) => {
      const currentState = state[name];

      const nextState = reducer(currentState, action);

      newState[name] = nextState;
    });

    return newState;
  };
};
