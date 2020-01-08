import { initialState } from 'constants/initialState';
import { auth } from 'constants/actionTypes';

export const authReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case auth.USER.SET: {
      return {
        ...state,
        user: payload,
      };
    }

    case auth.USER.DELETE: {
      return {
        ...state,
        user: null,
      };
    }

    case auth.ERROR.SET: {
      return {
        ...state,
        error: payload,
      };
    }

    case auth.ERROR.DELETE: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};
