import { auth } from '../../constants/actionTypes';
import { loginQuery, registerQuery } from '../../utils/queries';
import { User } from '../../shared/User';

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

export const logIn = (login, password) => async (dispatch) => {
  try {
    const { token } = await loginQuery(login, password);

    const user = new User(login, token);

    dispatch(setUser(user));
  } catch (error) {
    console.log(error);

    dispatch(setError(error));
  }
};

export const register = (login, password) => async (dispatch) => {
  try {
    const { token } = await registerQuery(login, password);

    const user = new User(login, token);

    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error));
  }
};
