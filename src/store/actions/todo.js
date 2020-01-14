import { todos } from 'constants/actionTypes';
import {
  addQuery,
  toggleQuery,
  deleteQuery,
  updateQuery,
  getListQuery,
} from 'utils/queries';
import { Todo } from 'shared/Todo';
import { error } from './auth';

export const setList = (list) => ({
  type: todos.LIST.SET,
  payload: list,
});

export const addItem = (item) => ({
  type: todos.LIST.ADD,
  payload: item,
});

export const toggleItem = (id) => ({
  type: todos.LIST.TOGGLE,
  payload: id,
});

export const deleteItem = (id) => ({
  type: todos.LIST.DELETE,
  payload: id,
});

export const updateItem = (id, inner) => ({
  type: todos.LIST.UPDATE,
  payload: { id, inner },
});

export const getList = (owner, token) => async (dispatch) => {
  try {
    const { res } = await getListQuery(owner, token);

    const todos = res.map(
      ({
        inner, _id, owner, completed,
      }) => new Todo(inner, _id, owner, completed),
    );

    dispatch(setList(todos));
  } catch (err) {
    dispatch(error(err));
  }
};

export const add = (inner, owner, token) => async (dispatch) => {
  try {
    await addQuery(inner, owner, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const toggle = (id, token) => async (dispatch) => {
  try {
    await toggleQuery(id, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const del = (id, token) => async (dispatch) => {
  try {
    await deleteQuery(id, token);
  } catch (err) {
    dispatch(error(err));
  }
};

export const update = (id, inner, token) => async (dispatch) => {
  try {
    await updateQuery(id, inner, token);
  } catch (err) {
    dispatch(error(err));
  }
};
