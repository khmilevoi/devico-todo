import { localStorage } from 'constants/actionTypes';
import { User } from 'shared/User';

import { setUser, deleteUser } from './auth';

export const setLocalStorage = (ls) => ({
  type: localStorage.SET,
  payload: ls,
});

export const readLocalStorage = () => (dispatch) => {
  const ls = window.localStorage;

  const { login, token } = ls;

  if (login && token) {
    const user = new User(login, token);

    dispatch(setUser(user));
    dispatch(setLocalStorage(ls));
  } else {
    dispatch(deleteUser());
  }
};
