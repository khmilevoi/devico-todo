import { todos } from '../../constants/actionTypes';
import {
  addQuery,
  toggleQuery,
  deleteQuery,
  updateQuery,
} from '../../utils/queries';
import { Todo } from '../../shared/Todo';

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

export const add = (inner) => async (dispatch) => {
  try {
    const response = await addQuery(inner);

    const todo = new Todo(response.inner, response._id, response.completed);

    dispatch(addItem(todo));
  } catch (error) {}
};

export const toggle = (id) => async (dispatch) => {
  try {
    await toggleQuery(id);

    dispatch(toggleItem(id));
  } catch (error) {}
};

export const del = (id) => async (dispatch) => {
  try {
    await deleteQuery(id);

    dispatch(deleteItem(id));
  } catch (error) {}
};

export const update = (id, inner) => async (dispatch) => {
  try {
    await updateQuery(id, inner);

    dispatch(updateItem(id, inner));
  } catch (error) {}
};
