import { initialState } from 'constants/initialState';
import { auth, localStorage } from 'constants/actionTypes';

const loadToLocalStorage = (entries) => {
  entries.forEach(([key, value]) => window.localStorage.setItem(key, value));
};

const removeFromLocalStorage = (keys) => {
  keys.forEach((key) => window.localStorage.removeItem(key));
};

const clearLocalStorage = () => window.localStorage.clear();

export const localStorageReducer = (
  state = initialState.localStorage,
  { type, payload },
) => {
  switch (type) {
    case auth.USER.SET: {
      const entries = Object.entries(payload);

      loadToLocalStorage(entries);

      return payload;
    }

    case auth.USER.DELETE: {
      clearLocalStorage();

      return null;
    }

    case localStorage.SET: {
      return payload;
    }

    default: {
      return state;
    }
  }
};
