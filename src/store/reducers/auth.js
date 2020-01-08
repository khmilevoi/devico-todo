import { initialState } from '../../constants/initialState';
import { auth } from '../../constants/actionTypes';

export const authReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case auth.USER.SET: {
      return {
        user: payload,
        ...state,
      };
    }

    case auth.USER.DELETE: {
      return {
        user: null,
        ...state,
      };
    }

    case auth.ERROR.SET: {
      return {
        error: payload,
        ...state,
      };
    }

    case auth.ERROR.DELETE: {
      return {
        error: null,
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
