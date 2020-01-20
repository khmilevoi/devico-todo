import { initialState } from 'constants/initialState';
import { auth, localStorage, lists } from 'constants/actionTypes';
import { AUTH_ITEM, ACTIVE_ITEM } from 'constants/localStorage';

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

      return window.localStorage;
    }

    case auth.USER.DELETE: {
      removeFromLocalStorage(AUTH_ITEM);

      return window.localStorage;
    }

    case lists.ACTIVE.SET: {
      loadToLocalStorage(ACTIVE_ITEM, payload.id);

      return window.localStorage;
    }

    case lists.ACTIVE.DELETE: {
      removeFromLocalStorage(ACTIVE_ITEM);

      return window.localStorage;
    }

    case localStorage.SET: {
      return payload;
    }

    default: {
      return state;
    }
  }
};
