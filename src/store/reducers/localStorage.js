import { initialState } from 'constants/initialState';
import { auth, localStorage, lists } from 'constants/actionTypes';
import { AUTH_ITEM, ACTIVE_ITEM } from 'constants/localStorage';
import {
  getLocalStorage,
  loadToLocalStorage,
  removeFromLocalStorage,
} from 'utils/localStorage';

export const localStorageReducer = (
  state = initialState.localStorage,
  { type, payload },
) => {
  switch (type) {
    case auth.REFRESH_TOKEN.SET: {
      loadToLocalStorage(AUTH_ITEM, payload);

      return { ...getLocalStorage() };
    }

    case auth.REFRESH_TOKEN.DELETE: {
      removeFromLocalStorage(AUTH_ITEM);

      return { ...getLocalStorage() };
    }

    case lists.ACTIVE.SET: {
      loadToLocalStorage(ACTIVE_ITEM, payload.id);

      return { ...getLocalStorage() };
    }

    case lists.ACTIVE.DELETE: {
      removeFromLocalStorage(ACTIVE_ITEM);

      return { ...getLocalStorage() };
    }

    case localStorage.SET: {
      return { ...getLocalStorage() };
    }

    default: {
      return state;
    }
  }
};
