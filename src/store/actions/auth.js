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

export const logIn = (login, password) => async (dispatch) => {
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

export const register = (login, password) => async (dispatch) => {
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
