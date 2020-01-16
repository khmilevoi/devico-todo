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
    params.body = JSON.stringify(body);
  }

  const response = await fetch(url, params).then((data) => data.json());

  if (response.ok === false) {
    throw response;
  }

  return response;
};

export const getListsQuery = (token) => makeQuery('/lists', methods.GET, {}, token);
export const addListQuery = (name, token) => makeQuery('/lists', methods.POST, { name }, token);
export const deleteListQuery = (id, token) => makeQuery(`/todos/${id}`, methods.DELETE, {}, token);
export const toggleListQuery = (id, token) => makeQuery(`/todos/${id}`, methods.PUT, {}, token);
export const shareListQuery = (id, owner, token) => makeQuery(`/todos/${id}`, methods.PATCH, { owner }, token);

export const getTodosQuery = (list, token) => makeQuery(`/todos?list=${list}`, methods.GET, {}, token);
export const addTodoQuery = (list, inner, token) => makeQuery(`/todos?list=${list}`, methods.POST, { inner }, token);
export const toggleTodoQuery = (id, token) => makeQuery(`/todos/${id}`, methods.PUT, {}, token);
export const deleteTodoQuery = (id, token) => makeQuery(`/todos/${id}`, methods.DELETE, {}, token);
export const updateTodoQuery = (id, inner, token) => makeQuery(`/todos/${id}`, methods.PATCH, { inner }, token);

export const loginQuery = (login, password) => makeQuery('/auth', methods.PUT, { login, password });
export const registerQuery = (login, password) => makeQuery('/auth', methods.POST, { login, password });
