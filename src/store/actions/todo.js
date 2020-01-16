import { todos } from 'constants/actionTypes';

import {
  addTodoQuery,
  toggleTodoQuery,
  deleteTodoQuery,
  updateTodoQuery,
  getTodosQuery,
} from 'utils/queries';

import { Todo } from 'shared/Todo';
import { error } from './auth';

export const setList = (res, list) => ({
  type: todos.LIST.SET,
  payload: { res, list },
});

export const addItem = (res, list) => ({
  type: todos.LIST.ADD,
  payload: { res, list },
});

export const toggleItem = (id, list) => ({
  type: todos.LIST.TOGGLE,
  payload: { id, list },
});

export const deleteItem = (id, list) => ({
  type: todos.LIST.DELETE,
  payload: { id, list },
});

export const updateItem = (id, inner, list) => ({
  type: todos.LIST.UPDATE,
  payload: { id, inner, list },
});

export const getTodos = (list, token) => async (dispatch) => {
  try {
    const { res } = await getTodosQuery(list, token);

    const todos = res.map(
      ({
        inner, _id, list, completed,
      }) => new Todo(inner, _id, list, completed),
    );

    dispatch(setList(todos, list));
  } catch (err) {
    dispatch(error(err));
  }
};

export const add = (list, inner, token) => async (dispatch) => {
  try {
    await addTodoQuery(list, inner, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const toggle = (id, token) => async (dispatch) => {
  try {
    await toggleTodoQuery(id, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const del = (id, token) => async (dispatch) => {
  try {
    await deleteTodoQuery(id, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const update = (id, inner, token) => async (dispatch) => {
  try {
    await updateTodoQuery(id, inner, token);
  } catch (err) {
    dispatch(error(err));
  }
};
