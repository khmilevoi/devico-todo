// @flow

import { auth } from 'constants/actionTypes';
import { loginQuery, registerQuery } from 'utils/queries';

import type { ActionCreator, Action, ThunkAction } from 'types/dux';

export const setUser: ActionCreator<Action> = (id, login, token) => ({
  type: auth.USER.SET,
  payload: { id, login, token },
});

export const deleteUser: ActionCreator<Action> = () => ({
  type: auth.USER.DELETE,
});

export const setError: ActionCreator<Action> = (error) => ({
  type: auth.ERROR.SET,
  payload: error,
});

export const deleteError: ActionCreator<Action> = () => ({
  type: auth.ERROR.DELETE,
});

export const error: ActionCreator<ThunkAction> = (err) => (dispatch) => {
  dispatch(setError(err));

  if (err.status === 401) {
    dispatch(deleteUser());
  }
};

export const logIn: ActionCreator<ThunkAction> = (
  login,
  password,
) => async (dispatch) => {
  try {
    const { token, _id: id, login: currentLogin } = await loginQuery(
      login,
      password,
    );

    dispatch(setUser(id, currentLogin, token));
    dispatch(deleteError());
  } catch (err) {
    dispatch(error(err));
  }
};

export const register: ActionCreator<ThunkAction> = (
  login,
  password,
) => async (dispatch) => {
  try {
    const { token, _id: id, login: currentLogin } = await registerQuery(
      login,
      password,
    );

    dispatch(setUser(id, currentLogin, token));
    dispatch(deleteError());
  } catch (err) {
    dispatch(error(err));
  }
};
