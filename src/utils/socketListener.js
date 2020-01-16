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
  addItem,
  toggleItem,
  deleteItem,
  updateItem,
  removeList,
} from 'store/actions/todo';

export const socketListener = {
  lists: (dispatch, message) => {
    switch (message.type) {
      case 'add': {
        const { res } = message;

        const list = new List(res._id, res.name, res.creator, res.public);

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

        const list = new List(res._id, res.name, res.creator, res.public);

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
  todos: (dispatch, message) => {
    switch (message.type) {
      case 'add': {
        const { res, list } = message;

        const todo = new Todo(res.inner, res._id, res.completed);

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

      default:
        break;
    }
  },
};
