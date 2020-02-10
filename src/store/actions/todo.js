import { todos } from 'constants/actionTypes';

import {
  addTodoQuery,
  toggleTodoQuery,
  deleteTodoQuery,
  updateTodoQuery,
  getTodosQuery,
  moveTodoQuery,
} from 'utils/queries';

import { Todo } from 'shared/Todo';
import { error } from './auth';

export const setList = (res, list) => ({
  type: todos.LIST.SET,
  payload: { res, list },
});

export const concatList = (res, list) => ({
  type: todos.LIST.CONCAT,
  payload: { res, list },
});

export const removeList = (list) => ({
  type: todos.LIST.DELETE_LIST,
  payload: list,
});

export const addItem = (res, list) => ({
  type: todos.LIST.ADD,
  payload: { res, list },
});

export const deleteItem = (id, list) => ({
  type: todos.LIST.DELETE,
  payload: { id, list },
});

export const updateItem = (id, list, data) => ({
  type: todos.LIST.UPDATE,
  payload: { id, list, data },
});

export const toggleItem = (id, list) => ({
  type: todos.LIST.TOGGLE,
  payload: { id, list },
});

export const updateInner = (id, inner, list) => updateItem(id, list, { inner });

export const moveItem = (list, id, prev) => ({
  type: todos.LIST.MOVE,
  payload: { list, id, prev },
});

export const getTodos = (list, token, start) => async (dispatch) => {
  try {
    const { res } = await getTodosQuery(list, start, token);

    const todos = res.map(
      (current) => new Todo(
        current.text,
        current.id,
        current.list,
        current.next,
        !!current.completed,
      ),
    );

    dispatch(concatList(todos, list));
  } catch (err) {
    dispatch(error(err));
  }
};

export const add = (list, inner, prev, token) => async (dispatch) => {
  try {
    await addTodoQuery(list, inner, prev, token);
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

export const move = (id, prev, token) => async (dispatch) => {
  try {
    await moveTodoQuery(id, prev, token);
  } catch (err) {
    dispatch(error(err));
  }
};
