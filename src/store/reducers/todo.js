// @flow

import type { Reducer } from 'types/dux';

import { initialState } from 'constants/initialState';
import { todos } from 'constants/actionTypes';

export const todosReducer: Reducer = (
  state = initialState.todos,
  { type, payload },
) => {
  switch (type) {
    case todos.LIST.SET: {
      return {
        ...state,
        list: payload,
      };
    }

    case todos.LIST.ADD: {
      const list = Array.from(state.list);
      list.push(payload);

      return { ...state, list };
    }

    case todos.LIST.TOGGLE: {
      const list = state.list.map((item) => (item.id === payload ? { ...item, completed: !item.completed } : item));

      return { ...state, list };
    }

    case todos.LIST.DELETE: {
      const list = state.list.filter((item) => item.id !== payload);

      return { ...state, list };
    }

    case todos.LIST.UPDATE: {
      const list = state.list.map((item) => (item.id === payload.id ? { ...item, inner: payload.inner } : item));

      return { ...state, list };
    }

    default: {
      return state;
    }
  }
};
