export const logger = () => (action, state) => {
  console.group('LOGGER');

  console.log('ACTION: ', action);

  console.groupCollapsed('STATE: ');

  Object.entries(state).forEach(([key, value]) => {
    console.log(`\t${key.toUpperCase()}: `, value);
  });

  console.groupEnd();

  console.groupEnd();
};
