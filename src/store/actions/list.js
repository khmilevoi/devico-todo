import { lists } from 'constants/actionTypes';
import {
  getListsQuery,
  addListQuery,
  deleteListQuery,
  toggleListQuery,
  shareListQuery,
} from 'utils/queries';
import { List } from 'shared/List';
import { error } from './auth';

export const setPersonal = (list) => ({
  type: lists.PERSONAL.SET,
  payload: list,
});

export const addPersonal = (list) => ({
  type: lists.PERSONAL.ADD,
  payload: list,
});

export const deletePersonal = (id) => ({
  type: lists.PERSONAL.DELETE,
  payload: id,
});

export const togglePersonal = (id) => ({
  type: lists.PERSONAL.TOGGLE,
  payload: id,
});

export const setShared = (list) => ({
  type: lists.SHARED.SET,
  payload: list,
});

export const addShared = (list) => ({
  type: lists.SHARED.ADD,
  payload: list,
});

export const deleteShared = (id) => ({
  type: lists.SHARED.DELETE,
  payload: id,
});

export const toggleShared = (id) => ({
  type: lists.SHARED.TOGGLE,
  payload: id,
});

export const setActive = (active) => ({
  type: lists.ACTIVE.SET,
  payload: active,
});

export const deleteActive = () => ({
  type: lists.ACTIVE.DELETE,
});

export const getLists = (token) => async (dispatch) => {
  try {
    const { personal, shared } = await getListsQuery(token);

    const personalList = personal.map(
      ({
        name, creator, public: isPublic, id, head, tail,
      }) => new List(id, name, creator, !!isPublic, head, tail),
    );

    const sharedList = shared.map(
      ({
        name, creator, public: isPublic, id, head, tail,
      }) => new List(id, name, creator, !!isPublic, head, tail),
    );

    dispatch(setPersonal(personalList));
    dispatch(setShared(sharedList));
  } catch (err) {
    dispatch(error(err));
  }
};

export const add = (name, token, refreshToken) => async (dispatch) => {
  try {
    await addListQuery(name, token, refreshToken);
  } catch (err) {
    dispatch(error(err));
  }
};

export const del = (id, token, refreshToken) => async (dispatch) => {
  try {
    await deleteListQuery(id, token, refreshToken);
  } catch (err) {
    dispatch(error(err));
  }
};

export const toggle = (id, token, refreshToken) => async (dispatch) => {
  try {
    await toggleListQuery(id, token, refreshToken);
  } catch (err) {
    dispatch(error(err));
  }
};

export const share = (id, owner, token, refreshToken) => async (dispatch) => {
  try {
    await shareListQuery(id, owner, token, refreshToken);
  } catch (err) {
    dispatch(error(err));
  }
};
