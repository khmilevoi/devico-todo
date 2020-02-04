import { initialState } from 'constants/initialState';
import { auth, localStorage, lists } from 'constants/actionTypes';
import { AUTH_ITEM, ACTIVE_ITEM } from 'constants/localStorage';
import { getLocalStorage } from 'store/actions/localStorage';

const loadToLocalStorage = (item, data) => {
  window.localStorage.setItem(item, JSON.stringify(data));
};

const removeFromLocalStorage = (item) => {
  window.localStorage.removeItem(item);
};

export const localStorageReducer = (
  state = initialState.localStorage,
  { type, payload },
) => {
  switch (type) {
    case auth.USER.SET: {
      loadToLocalStorage(AUTH_ITEM, payload);

      return getLocalStorage(AUTH_ITEM);
    }

    case auth.USER.TOKEN.SET: {
      const ls = { ...state, token: payload };

      loadToLocalStorage(AUTH_ITEM, ls);

      return getLocalStorage(AUTH_ITEM);
    }

    case auth.USER.DELETE: {
      removeFromLocalStorage(AUTH_ITEM);

      return getLocalStorage(AUTH_ITEM);
    }

    case lists.ACTIVE.SET: {
      loadToLocalStorage(ACTIVE_ITEM, payload.id);

      return getLocalStorage(AUTH_ITEM);
    }

    case lists.ACTIVE.DELETE: {
      removeFromLocalStorage(ACTIVE_ITEM);

      return getLocalStorage(AUTH_ITEM);
    }

    case localStorage.SET: {
      return getLocalStorage(AUTH_ITEM);
    }

    default: {
      return state;
    }
  }
};
