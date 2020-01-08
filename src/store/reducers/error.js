import { initialState } from 'constants/initialState';
import { error } from 'constants/actionTypes';

export const errorReducer = (state = initialState.error, { type, payload }) => {
  switch (type) {
    case error.SET: {
      const list = Array.from(state.list);
      list.push(payload);

      return { ...state, list };
    }

    case error.DELETE: {
      const list = state.list.map((item) => item !== payload);

      return { ...state, list };
    }

    default: {
      return state;
    }
  }
};
