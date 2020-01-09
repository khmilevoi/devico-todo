import { initialState } from 'constants/initialState';
import { auth } from 'constants/actionTypes';

export const errorReducer = (state = initialState.error, { type, payload }) => {
  switch (type) {
    case auth.ERROR.SET: {
      const list = Array.from(state.list);
      list.push(payload);

      return { ...state, list };
    }

    case auth.ERROR.DELETE: {
      const list = state.list.map((item) => item !== payload);

      return { ...state, list };
    }

    default: {
      return state;
    }
  }
};
