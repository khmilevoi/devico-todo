const idGenerator = (() => {
  let currentId = 0;

  return () => currentId++;
})();

const config = {
  PORT: 3000,
};

const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';

const makeQuery = (query) => `http://localhost:${config.PORT}${query}`;

const makeGetListQuery = () => makeQuery('/todos');

const makeAddQuery = (inner) => makeQuery(`/todos/add?inner=${inner}`);

const makeToggleQuery = (id) => makeQuery(`/todos/toggle/${id}`);

const makeDeleteQuery = (id) => makeQuery(`/todos/delete/${id}`);

const makeUpdateQuery = (id, inner) => makeQuery(`/todos/update/${id}?inner=${inner}`);

const query = async (str, method) => fetch(str, { method }).then((data) => data.json());

const getListQuery = () => query(makeGetListQuery(), GET);

const addQuery = (inner) => query(makeAddQuery(inner), POST);

const toggleQuery = (id) => query(makeToggleQuery(id), POST);

const deleteQuery = (id) => query(makeDeleteQuery(id), DELETE);

const updateQuery = (id, inner) => query(makeUpdateQuery(id, inner), POST);
