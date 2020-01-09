import { methods } from 'constants/methods';

const config = {
  PORT: 3000,
};

const createURL = (query) => `http://localhost:${config.PORT}${query}`;

const makeQuery = async (query, method = methods.GET, body = {}, headers) => {
  const url = createURL(query);

  const params = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers,
    }),
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

export const getListQuery = () => makeQuery('/todos');
export const addQuery = (inner) => makeQuery(`/todos?inner=${inner}`, methods.POST);
export const toggleQuery = (id) => makeQuery(`/todos/${id}`, methods.PUT);
export const deleteQuery = (id) => makeQuery(`/todos/${id}`, methods.DELETE);
export const updateQuery = (id, inner) => makeQuery(`/todos/${id}?inner=${inner}`, methods.PATCH);

export const loginQuery = (login, password) => makeQuery('/auth', methods.PUT, { login, password });
export const registerQuery = (login, password) => makeQuery('/auth', methods.POST, { login, password });
