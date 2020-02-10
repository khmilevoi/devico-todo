import { initialState } from 'constants/initialState';
import { todos } from 'constants/actionTypes';

export const todosReducer = (state = initialState.todos, { type, payload }) => {
  switch (type) {
    case todos.LIST.SET: {
      const list = { ...state.list, [payload.list]: payload.res };

      return {
        ...state,
        list,
      };
    }

    case todos.LIST.CONCAT: {
      const list = { ...state.list };

      list[payload.list] = list[payload.list] || [];
      list[payload.list] = list[payload.list].concat(payload.res);

      return {
        ...state,
        list,
      };
    }

    case todos.LIST.DELETE_LIST: {
      const list = { ...state.list };

      delete list[payload];

      return { ...state, list };
    }

    case todos.LIST.ADD: {
      const list = { ...state.list };

      list[payload.list] = list[payload.list] || [];

      list[payload.list].push(payload.res);

      return { ...state, list };
    }

    case todos.LIST.TOGGLE: {
      const list = { ...state.list };

      if (list[payload.list]) {
        list[payload.list] = list[payload.list].map((item) => (item.id === payload.id
          ? { ...item, completed: !item.completed }
          : item));
      }

      return { ...state, list };
    }

    case todos.LIST.DELETE: {
      const list = { ...state.list };

      if (list[payload.list]) {
        list[payload.list] = list[payload.list].filter(
          (item) => item.id !== payload.id,
        );
      }

      return { ...state, list };
    }

    case todos.LIST.UPDATE: {
      const list = { ...state.list };

      if (list[payload.list]) {
        list[payload.list] = list[payload.list].map((item) => (item.id === payload.id ? { ...item, ...payload.data } : item));
      }

      return { ...state, list };
    }

    default: {
      return state;
    }
  }
};
