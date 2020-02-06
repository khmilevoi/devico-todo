import { localStorage } from 'constants/actionTypes';
import { AUTH_ITEM, BUSY_ITEM } from 'constants/localStorage';

import { loadToLocalStorage, getLocalStorage } from 'utils/localStorage';

import { deleteUser, check } from './auth';

export const setLocalStorage = () => ({
  type: localStorage.SET,
});

export const wait = () => new Promise((resolve) => {
  const start = new Date();

  const generateTimeout = () => Math.floor(Math.random() * 500);

  const checkBusy = () => {
    const busy = getLocalStorage(BUSY_ITEM);

    const current = new Date();

    if (!busy) {
      console.log(
        'STOP WAITING: ',
        `${current.getMinutes()}:${current.getSeconds()}:${current.getMilliseconds()}`,
      );
      console.groupEnd();

      loadToLocalStorage(BUSY_ITEM, true);
      resolve();
    } else if (current - start >= 10000) {
      loadToLocalStorage(BUSY_ITEM, false);

      setTimeout(async () => {
        console.log(
          'STOP WAITING(timeout): ',
          `${current.getMinutes()}:${current.getSeconds()}:${current.getMilliseconds()}`,
        );
        console.groupEnd();

        loadToLocalStorage(BUSY_ITEM, true);
        resolve();
      }, generateTimeout());
    } else {
      window.requestAnimationFrame(checkBusy);
    }
  };

  console.groupCollapsed(
    'START WAITING: ',
    `${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`,
  );

  setTimeout(() => checkBusy(), generateTimeout());
});

export const readLocalStorage = () => async (dispatch) => {
  await wait();

  const { token } = getLocalStorage(AUTH_ITEM) || {};

  if (token) {
    dispatch(check(token));
    dispatch(setLocalStorage());
  } else {
    dispatch(deleteUser());
  }
};
