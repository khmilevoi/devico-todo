import { auth } from 'constants/actionTypes';

import { loginQuery, registerQuery } from 'utils/queries';

export const setUser = (id, login, token) => ({
  type: auth.USER.SET,
  payload: { id, login, token },
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

const authorization = (login, password, isLogin) => async (dispatch) => {
  try {
    const { token, id, login: currentLogin } = await (isLogin
      ? loginQuery(login, password)
      : registerQuery(login, password));

    dispatch(setUser(id, currentLogin, token));
    dispatch(deleteError());
  } catch (err) {
    dispatch(error(err));
  }
};

export const logIn = (login, password) => authorization(login, password, true);

export const register = (login, password) => authorization(login, password, false);
