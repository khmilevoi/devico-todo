import { todo } from '../../constants/actionTypes';
import { addQuery, toggleQuery, deleteQuery } from '../../utils/queries';
import { Todo } from '../../shared/Todo';

export const setList = (list) => ({
  type: todo.LIST.SET,
  payload: list,
});

export const addItem = (item) => ({
  type: todo.LIST.ADD,
  payload: item,
});

export const toggleItem = (id) => ({
  type: todo.LIST.TOGGLE,
  payload: id,
});

export const deleteItem = (id) => ({
  type: todo.LIST.DELETE,
  payload: id,
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
