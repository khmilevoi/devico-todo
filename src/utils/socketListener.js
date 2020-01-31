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

export const socketListener = {
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

        const list = new List(res.id, res.name, res.creator, res.public);

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

        const todo = new Todo(res.inner, res.id, list, res.next, res.completed);

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
