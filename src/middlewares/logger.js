export const logger = () => (action, state) => {
  const time = new Date();

  console.group(
    'LOGGER: ',
    `${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`,
  );

  console.log('ACTION: ', action);

  console.groupCollapsed('STATE: ');

  Object.entries(state).forEach(([key, value]) => {
    console.log(`\t${key.toUpperCase()}: `, value);
  });

  console.groupEnd();

  console.groupEnd();
};
