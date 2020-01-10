import { User } from 'shared/User';

import { initialState } from 'constants/initialState';
import { auth } from 'constants/actionTypes';

export const authReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case auth.USER.SET: {
      const { id, login, token } = payload;

      const user = new User(id, login, token);

      return {
        ...state,
        user,
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
