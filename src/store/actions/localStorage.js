import { localStorage } from 'constants/actionTypes';
import { AUTH_ITEM } from 'constants/localStorage';

import { deleteUser, check } from './auth';

export const setLocalStorage = () => ({
  type: localStorage.SET,
});

export const getLocalStorage = (item) => {
  if (item) {
    return JSON.parse(window.localStorage.getItem(item)) || {};
  }

  return Object.entries(window.localStorage).reduce((ls, [key, value]) => {
    const localStorage = ls;

    try {
      localStorage[key] = JSON.parse(value);
    } catch (err) {
      localStorage[key] = value;
    }

    return localStorage;
  }, {});
};

export const readLocalStorage = () => (dispatch) => {
  const auth = getLocalStorage(AUTH_ITEM);
  const { token } = auth;

  if (token) {
    dispatch(check(token));
    dispatch(setLocalStorage());
  } else {
    dispatch(deleteUser());
  }
};
