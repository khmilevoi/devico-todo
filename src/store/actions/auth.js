import { auth } from 'constants/actionTypes';

import { loginQuery, registerQuery, checkQuery } from 'utils/queries';
import { interval } from 'utils/socketListener';
import { socket } from 'utils/socket';
import { loadToLocalStorage } from 'utils/localStorage';

import { BUSY_ITEM } from 'constants/localStorage';
import { registerServiceWorker } from 'utils/serviceWorker';

export const setRefreshToken = (token) => ({
  type: auth.REFRESH_TOKEN.SET,
  payload: token,
});

export const deleteRefreshToken = () => ({
  type: auth.REFRESH_TOKEN.DELETE,
});

export const setUser = (id, login, token, live) => async (dispatch) => {
  setTimeout(async () => {
    const getSubscription = await registerServiceWorker();

    if (getSubscription) {
      const subscription = await getSubscription();

      console.log(subscription);

      socket.emit('subscription', { token, subscription });
    }
  }, 1);

  socket.emit('auth', { token });

  dispatch({
    type: auth.USER.SET,
    payload: {
      id,
      login,
      token,
      live,
    },
  });
};

export const deleteUser = () => (dispatch) => {
  dispatch(deleteRefreshToken());

  loadToLocalStorage(BUSY_ITEM, false);

  dispatch({
    type: auth.USER.DELETE,
  });
};

export const setSessionToken = (token) => ({
  type: auth.USER.TOKEN.SET,
  payload: token,
});

export const setError = (error) => ({
  type: auth.ERROR.SET,
  payload: error,
});

export const deleteError = () => ({
  type: auth.ERROR.DELETE,
});

export const logout = () => (dispatch) => {
  socket.emit('exit');
  interval.clear('session');
  interval.clear('refresh');

  dispatch(deleteUser());
};

export const error = (err) => (dispatch) => {
  dispatch(setError(err));

  if (err.status === 401) {
    dispatch(logout());
  }

  throw err;
};

export const check = (refreshToken) => async (dispatch) => {
  try {
    const {
      id, login, live, token,
    } = await checkQuery(refreshToken);

    dispatch(setUser(id, login, token, live));
  } catch (err) {
    dispatch(error(err));
  }
};

const authorization = (login, password, isLogin) => async (dispatch) => {
  try {
    const {
      token, id, login: currentLogin, live,
    } = await (isLogin
      ? loginQuery(login, password)
      : registerQuery(login, password));

    dispatch(setUser(id, currentLogin, token, live));
    dispatch(deleteError());
  } catch (err) {
    dispatch(error(err));
  }
};

export const logIn = (login, password) => authorization(login, password, true);

export const register = (login, password) => authorization(login, password, false);
