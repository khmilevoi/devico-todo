import { localStorage } from 'constants/actionTypes';
import { AUTH_ITEM } from 'constants/localStorage';

import { setUser, deleteUser } from './auth';

export const setLocalStorage = () => ({
  type: localStorage.SET,
});

export const getLocalStorage = (item) => JSON.parse(window.localStorage.getItem(item)) || {};

export const readLocalStorage = () => (dispatch) => {
  const auth = getLocalStorage(AUTH_ITEM);
  const {
    login, token, id, live,
  } = auth;

  if (login && token && id && live) {
    dispatch(setUser(id, login, token, live));
    dispatch(setLocalStorage());
  } else {
    dispatch(deleteUser());
  }
};
