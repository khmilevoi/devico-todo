const idGenerator = (() => {
  let currentId = 0;

  return () => currentId++;
})();

const config = {
  PORT: 3000,
};

const createURL = (query) => `http://localhost:${config.PORT}${query}`;

const makeQuery = (query, method = GET, body = null) => {
  const url = createURL(query);

  if (method === GET) {
    return fetch(url, { method }).then((data) => data.json());
  }

  return fetch(url, { method, body: JSON.stringify(body) }).then((data) => data.json());
};

const getListQuery = () => makeQuery('/todos');
const addQuery = (inner) => makeQuery(`/todos?inner=${inner}`, POST);
const toggleQuery = (id) => makeQuery(`/todos/${id}`, PUT);
const deleteQuery = (id) => makeQuery(`/todos/${id}`, DELETE);
const updateQuery = (id, inner) => makeQuery(`/todos/${id}?inner=${inner}`, PATCH);
