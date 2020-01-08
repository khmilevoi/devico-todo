<<<<<<< HEAD
import { initialState } from '../../constants/initialState';
import { auth } from '../../constants/actionTypes';
=======
import { initialState } from 'constants/initialState';
import { auth } from 'constants/actionTypes';
>>>>>>> webpack

export const authReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case auth.USER.SET: {
      return {
<<<<<<< HEAD
        user: payload,
        ...state,
=======
        ...state,
        user: payload,
>>>>>>> webpack
      };
    }

    case auth.USER.DELETE: {
      return {
<<<<<<< HEAD
        user: null,
        ...state,
=======
        ...state,
        user: null,
>>>>>>> webpack
      };
    }

    case auth.ERROR.SET: {
      return {
<<<<<<< HEAD
        error: payload,
        ...state,
=======
        ...state,
        error: payload,
>>>>>>> webpack
      };
    }

    case auth.ERROR.DELETE: {
      return {
<<<<<<< HEAD
        error: null,
        ...state,
=======
        ...state,
        error: null,
>>>>>>> webpack
      };
    }

    default: {
      return state;
    }
  }
};
