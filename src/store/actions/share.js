import { share } from 'constants/actionTypes';

import { getUserListQuery } from 'utils/queries';

import { error } from './auth';

export const setList = (list) => ({
  type: share.LIST.SET,
  payload: list,
});

export const deleteList = () => ({
  type: share.LIST.DELETE,
});

export const setUsers = (users) => ({
  type: share.USERS.SET,
  payload: users,
});

export const deleteUsers = () => ({
  type: share.USERS.DELETE,
});

export const getUserList = (login) => async (dispatch) => {
  try {
    const { users } = await getUserListQuery(login);

    dispatch(setUsers(users.sort((a, b) => b.coefficient - a.coefficient)));
  } catch (err) {
    error(err);
  }
};
