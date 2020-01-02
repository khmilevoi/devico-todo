function generateAction(prefix) {
  return {
    ADD: `${prefix}.ADD`,
    TOGGLE: `${prefix}.TOGGLE`,
    DELETE: `${prefix}.DELETE`
  };
}

const actions = {
  TODOS: generateAction("LIST.TODO")
};
