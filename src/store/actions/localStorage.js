// @flow

import type { ActionCreator, Action, ThunkAction } from 'types/dux';

import { localStorage } from 'constants/actionTypes';

import { setUser, deleteUser } from './auth';

export const setLocalStorage: ActionCreator<Action> = (ls) => ({
  type: localStorage.SET,
  payload: ls,
});

export const readLocalStorage: ActionCreator<ThunkAction> = () => (dispatch) => {
  const ls = window.localStorage;

  const { id, login, token } = ls;

  if (login && token && id) {
    dispatch(setUser(id, login, token));
    dispatch(setLocalStorage(ls));
  } else {
    dispatch(deleteUser());
  }
};
