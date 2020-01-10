import { localStorage } from 'constants/actionTypes';

import { setUser, deleteUser } from './auth';

export const setLocalStorage = (ls) => ({
  type: localStorage.SET,
  payload: ls,
});

export const readLocalStorage = () => (dispatch) => {
  const ls = window.localStorage;

  const { id, login, token } = ls;

  if (login && token && id) {
    dispatch(setUser(id, login, token));
    dispatch(setLocalStorage(ls));
  } else {
    dispatch(deleteUser());
  }
};
