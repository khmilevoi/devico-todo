function generateAction(prefix) {
  return {
    ADD: `${prefix}.ADD`,
    TOGGLE: `${prefix}.TOGGLE`,
    DELETE: `${prefix}.DELETE`,
    UPDATE: `${prefix}.UPDATE`,
    GET_LIST: `${prefix}.GET_LIST`,
  };
}

const actions = {
  TODOS: generateAction('LIST.TODO'),
};

const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';
