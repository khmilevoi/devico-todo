import { methods } from 'constants/methods';

const config = {
  PORT: 3000,
};

const createURL = (query) => `http://localhost:${config.PORT}${query}`;

const makeQuery = async (query, method = methods.GET, body = {}, token) => {
  const url = createURL(query);

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const params = {
    method,
    headers: new Headers(headers),
  };

  if (method !== methods.GET) {
    const json = JSON.stringify(body);
    params.body = json;
  }

  const response = await fetch(url, params).then((data) => data.json());

  if (response.ok === false) {
    throw response;
  }

  return response;
};

export const getUserListQuery = (login) => makeQuery(`/users?login=${login}`, methods.GET);

export const getListsQuery = (token) => makeQuery('/lists', methods.GET, {}, token);
export const addListQuery = (name, token) => makeQuery('/lists', methods.POST, { name }, token);
export const deleteListQuery = (id, token) => makeQuery(`/lists/${id}`, methods.DELETE, {}, token);
export const toggleListQuery = (id, token) => makeQuery(`/lists/${id}`, methods.PUT, {}, token);
export const shareListQuery = (id, newOwner, token) => makeQuery(`/lists/${id}`, methods.PATCH, { newOwner }, token);

export const getTodosQuery = (list, start, token) => makeQuery(`/todos?list=${list}&start=${start}`, methods.GET, {}, token);
export const addTodoQuery = (list, inner, prev, token) => makeQuery(`/todos?list=${list}`, methods.POST, { inner, prev }, token);
export const toggleTodoQuery = (id, token) => makeQuery(`/todos/${id}`, methods.PUT, {}, token);
export const deleteTodoQuery = (id, token) => makeQuery(`/todos/${id}`, methods.DELETE, {}, token);
export const updateTodoQuery = (id, inner, token) => makeQuery(`/todos/${id}`, methods.PATCH, { inner, type: 'update' }, token);
export const moveTodoQuery = (id, prev, token) => makeQuery(`/todos/${id}`, methods.PATCH, { prev, type: 'move' }, token);

export const checkQuery = (refreshToken) => makeQuery('/auth/check', methods.POST, { refreshToken });
export const loginQuery = (login, password) => makeQuery('/auth', methods.PUT, { login, password });
export const registerQuery = (login, password) => makeQuery('/auth', methods.POST, { login, password });

export const updateRefreshQuery = (refreshToken, token) => makeQuery('/token/refresh', methods.POST, { refreshToken }, token);
export const updateSessionQuery = (refreshToken, token) => makeQuery('/token', methods.POST, { refreshToken }, token);
