// @flow

import type { ActionCreator, Action, ThunkAction } from 'types/dux';

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

export const setList: ActionCreator<Action> = (list) => ({
  type: todos.LIST.SET,
  payload: list,
});

export const addItem: ActionCreator<Action> = (item) => ({
  type: todos.LIST.ADD,
  payload: item,
});

export const toggleItem: ActionCreator<Action> = (id) => ({
  type: todos.LIST.TOGGLE,
  payload: id,
});

export const deleteItem: ActionCreator<Action> = (id) => ({
  type: todos.LIST.DELETE,
  payload: id,
});

export const updateItem: ActionCreator<Action> = (id, inner) => ({
  type: todos.LIST.UPDATE,
  payload: { id, inner },
});

export const getList: ActionCreator<ThunkAction> = (
  owner,
  token,
) => async (dispatch) => {
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

export const add: ActionCreator<ThunkAction> = (
  inner,
  owner,
  token,
) => async (dispatch) => {
  try {
    const { res } = await addQuery(inner, owner, token);

    const todo = new Todo(res.inner, res._id, res.completed);

    dispatch(addItem(todo));
  } catch (err) {
    dispatch(error(err));
  }
};

export const toggle: ActionCreator<ThunkAction> = (
  id,
  token,
) => async (dispatch) => {
  try {
    await toggleQuery(id, token);

    dispatch(toggleItem(id));
  } catch (err) {
    dispatch(error(err));
  }
};

export const del: ActionCreator<ThunkAction> = (
  id,
  token,
) => async (dispatch) => {
  try {
    await deleteQuery(id, token);

    dispatch(deleteItem(id));
  } catch (err) {
    dispatch(error(err));
  }
};

export const update: ActionCreator<ThunkAction> = (
  id,
  inner,
  token,
) => async (dispatch) => {
  try {
    await updateQuery(id, inner, token);

    dispatch(updateItem(id, inner));
  } catch (err) {
    dispatch(error(err));
  }
};
