import { Todo } from 'shared/Todo';

import {
  addItem,
  toggleItem,
  deleteItem,
  updateItem,
} from 'store/actions/todo';

export const socketListener = {
  todos: (dispatch, message) => {
    switch (message.type) {
      case 'add': {
        const { res } = message;

        const todo = new Todo(res.inner, res._id, res.completed);

        dispatch(addItem(todo));

        break;
      }

      case 'toggle': {
        const { id } = message;

        dispatch(toggleItem(id));

        break;
      }

      case 'delete': {
        const { id } = message;

        dispatch(deleteItem(id));

        break;
      }

      case 'update': {
        const { id, inner } = message;

        dispatch(updateItem(id, inner));

        break;
      }

      default:
        break;
    }
  },
};
