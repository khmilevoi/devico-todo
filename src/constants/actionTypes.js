const createAccessActions = (prefix) => ({
  SET: `${prefix}.SET`,
  DELETE: `${prefix}.DELETE`,
});

export const auth = {
  ...createAccessActions('USER'),
};
