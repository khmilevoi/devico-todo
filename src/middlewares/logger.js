export const logger = () => (action, state) => {
  console.log('ACTION: ', action);

  console.log('STATE: ');

  Object.entries(state).forEach(([key, value]) => {
    console.log(`\t${key.toUpperCase()}: `, value);
  });
};
