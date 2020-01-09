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

  console.log(response);

  if (response.ok === false) {
    throw response;
  }

  return response;
};

export const getListQuery = (token) => makeQuery('/todos', null, null, token);
export const addQuery = (inner, token) => makeQuery(`/todos?inner=${inner}`, methods.POST, null, token);
export const toggleQuery = (id, token) => makeQuery(`/todos/${id}`, methods.PUT, null, token);
export const deleteQuery = (id, token) => makeQuery(`/todos/${id}`, methods.DELETE, null, token);
export const updateQuery = (id, inner, token) => makeQuery(`/todos/${id}?inner=${inner}`, methods.PATCH, null, token);

// export const checkQuery = (token) => makeQuery('/auth', methods.GET, null, {
//   Authorization: `Bearer ${token}`,
// });
export const loginQuery = (login, password) => makeQuery('/auth', methods.PUT, { login, password });
export const registerQuery = (login, password) => makeQuery('/auth', methods.POST, { login, password });
