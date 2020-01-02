function generateAction(prefix) {
  return {
    ADD: `${prefix}.ADD`,
    TOGGLE: `${prefix}.TOGGLE`,
    DELETE: `${prefix}.DELETE`,
    UPDATE: `${prefix}.UPDATE`
  };
}

const actions = {
  TODOS: generateAction("LIST.TODO")
};
