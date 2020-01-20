import { localStorage } from 'constants/actionTypes';
import { AUTH_ITEM } from 'constants/localStorage';

import { setUser, deleteUser } from './auth';

export const setLocalStorage = (ls) => ({
  type: localStorage.SET,
  payload: ls,
});

export const readLocalStorage = () => (dispatch) => {
  const auth = JSON.parse(window.localStorage.getItem(AUTH_ITEM)) || {};
  const { login, token, id } = auth;

  if (login && token && id) {
    dispatch(setUser(id, login, token));
    dispatch(setLocalStorage(window.localStorage));
  } else {
    dispatch(deleteUser());
  }
};
