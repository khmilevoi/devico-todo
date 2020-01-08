const createAccessActions = (prefix) => ({
  SET: `${prefix}.SET`,
  DELETE: `${prefix}.DELETE`,
});

const createListActions = (prefix) => ({
  SET: `${prefix}.SET`,
  ADD: `${prefix}.ADD`,
  TOGGLE: `${prefix}.TOGGLE`,
  UPDATE: `${prefix}.UPDATE`,
  DELETE: `${prefix}.DELETE`,
});

export const auth = {
  USER: createAccessActions('USER'),
  ERROR: createAccessActions('ERROR'),
};

export const todo = {
  LIST: createListActions('TODO'),
};
