import { initialState } from 'constants/initialState';
import { share } from 'constants/actionTypes';

export const shareReducer = (state = initialState.share, { type, payload }) => {
  switch (type) {
    case share.LIST.SET: {
      return { ...state, list: payload };
    }

    case share.LIST.DELETE: {
      return { ...state, list: null };
    }

    case share.USERS.SET: {
      return { ...state, users: payload };
    }

    case share.USERS.DELETE: {
      return { ...state, users: null };
    }

    default:
      return state;
  }
};
