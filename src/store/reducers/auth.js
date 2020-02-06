import { User } from 'shared/User';

import { initialState } from 'constants/initialState';
import { auth } from 'constants/actionTypes';

export const authReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case auth.USER.SET: {
      const {
        id, login, token, live,
      } = payload;

      const user = new User(id, login, token, live);

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

    case auth.USER.TOKEN.SET: {
      if (state.user) {
        const user = { ...state.user };
        user.token = payload;

        return { ...state, user };
      }

      return state;
    }

    case auth.REFRESH_TOKEN.SET: {
      return {
        ...state,
        refreshToken: payload,
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
