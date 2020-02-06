import { List } from 'shared/List';
import { Todo } from 'shared/Todo';

import {
  addPersonal,
  addShared,
  deletePersonal,
  deleteShared,
  togglePersonal,
  toggleShared,
} from 'store/actions/list';

import {
  setList,
  addItem,
  toggleItem,
  deleteItem,
  updateItem,
  removeList,
} from 'store/actions/todo';

import { setRefreshToken, setSessionToken, error } from 'store/actions/auth';
import { getLocalStorage, loadToLocalStorage } from 'utils/localStorage';

import { AUTH_ITEM, BUSY_ITEM } from 'constants/localStorage';

import { wait } from 'store/actions/localStorage';

import { Interval } from './interval';
import { updateRefreshQuery, updateSessionQuery } from './queries';

export const interval = new Interval();

const updateSession = async (dispatch, getState) => {
  try {
    await wait();
    loadToLocalStorage(BUSY_ITEM, false);

    const { auth } = getState();
    const { user } = auth;

    if (user && user.token) {
      const refresh = getLocalStorage(AUTH_ITEM) || auth.refreshToken;

      const { token: newToken } = await updateSessionQuery(
        refresh.token,
        user.token,
      );

      dispatch(setSessionToken(newToken));
    }
  } catch (err) {
    dispatch(error(err));
  }
};

const updateRefresh = async (dispatch, getState) => {
  try {
    await wait();

    // debugger;

    const { auth } = getState();
    const { user } = auth;

    const refresh = getLocalStorage(AUTH_ITEM) || auth.refreshToken;

    const { token: newToken } = await updateRefreshQuery(
      refresh.token,
      user.token,
    );

    dispatch(setRefreshToken({ ...refresh, token: newToken }));

    loadToLocalStorage(BUSY_ITEM, false);
  } catch (err) {
    dispatch(error(err));
  }
};

export const socketListener = {
  auth: (dispatch, getState, { refreshToken }) => {
    const { auth } = getState();
    const { user } = auth;

    dispatch(setRefreshToken(refreshToken));

    loadToLocalStorage(BUSY_ITEM, false);

    interval.add(
      'session',
      () => updateSession(dispatch, getState),
      user.live / 2,
    );

    interval.add(
      'refresh',
      () => updateRefresh(dispatch, getState),
      refreshToken.live / 2,
    );
  },
  lists: (dispatch, _, message) => {
    switch (message.type) {
      case 'add': {
        const { res } = message;

        const list = new List(
          res.id,
          res.name,
          res.creator,
          res.public,
          res.head,
          res.tail,
        );

        dispatch(addPersonal(list));

        break;
      }

      case 'delete': {
        const { id, listType } = message;

        dispatch(removeList(id));

        if (listType === 'personal') {
          dispatch(deletePersonal(id));
        }

        if (listType === 'shared') {
          dispatch(deleteShared(id));
        }

        break;
      }

      case 'toggle': {
        const { id, listType } = message;

        // debugger;

        if (listType === 'personal') {
          dispatch(togglePersonal(id));
        }

        if (listType === 'shared') {
          dispatch(toggleShared(id));
        }

        break;
      }

      case 'share': {
        const { res, listType } = message;

        const list = new List(res.id, res.name, res.creator, !!res.public);

        // if (listType === 'personal') {
        // }

        if (listType === 'shared') {
          dispatch(addShared(list));
        }

        break;
      }

      default:
        break;
    }
  },
  todos: (dispatch, getState, message) => {
    switch (message.type) {
      case 'add': {
        const { res, list } = message;

        const todo = new Todo(res.text, res.id, list, res.next, res.completed);

        dispatch(addItem(todo, list));

        break;
      }

      case 'toggle': {
        const { id, list } = message;

        dispatch(toggleItem(id, list));

        break;
      }

      case 'delete': {
        const { id, list } = message;

        dispatch(deleteItem(id, list));

        break;
      }

      case 'update': {
        const { id, inner, list } = message;

        dispatch(updateItem(id, inner, list));

        break;
      }

      case 'move': {
        const { id, prev, list: listId } = message;

        const { todos } = getState();
        const { list } = todos;

        const currentList = list[listId];

        if (currentList) {
          const currentItemIndex = currentList.findIndex(
            (item) => item.id === id,
          );
          const [item] = currentList.splice(currentItemIndex, 1);

          const prevItemIndex = currentList.findIndex((item) => item.id === prev);

          currentList.splice(prevItemIndex + 1, 0, item);
        }

        dispatch(setList(currentList, listId));

        break;
      }

      default:
        break;
    }
  },
};
