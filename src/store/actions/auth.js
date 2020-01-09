import { auth } from 'constants/actionTypes';
import { checkQuery, loginQuery, registerQuery } from 'utils/queries';

import { User } from 'shared/User';

export const setUser = (user) => ({
  type: auth.USER.SET,
  payload: user,
});

export const deleteUser = () => ({
  type: auth.USER.DELETE,
});

export const setError = (error) => ({
  type: auth.ERROR.SET,
  payload: error,
});

export const deleteError = () => ({
  type: auth.ERROR.DELETE,
});

export const error = (err) => (dispatch) => {
  dispatch(setError(err));

  if (err.status === 401) {
    dispatch(deleteUser());
  }
};

export const logIn = (login, password) => async (dispatch) => {
  try {
    const { token } = await loginQuery(login, password);

    const user = new User(login, token);

    dispatch(setUser(user));
  } catch (err) {
    dispatch(error(err));
  }
};

export const register = (login, password) => async (dispatch) => {
  try {
    const { token } = await registerQuery(login, password);

    const user = new User(login, token);

    dispatch(setUser(user));
  } catch (err) {
    dispatch(error(err));
  }
};
