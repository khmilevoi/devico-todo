export const logger = () => (action, state) => {
  const time = new Date();

  console.groupCollapsed(
    '\x1b[32m%s\x1b[0m',
    `${
      action.type
    }: ${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`,
  );

  console.log('ACTION: ', action);

  console.group('STATE: ');

  Object.entries(state).forEach(([key, value]) => {
    console.log(`\t${key.toUpperCase()}: `, value);
  });

  console.groupEnd();

  console.groupEnd();
};
