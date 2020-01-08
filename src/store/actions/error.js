import { error } from 'constants/actionTypes';

export const setError = (error) => ({
  type: error.SET,
  payload: error,
});

export const deleteError = () => ({
  type: error.DELETE,
});
