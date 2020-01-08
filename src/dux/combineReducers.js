export const combineReducers = (object) => {
  const reducers = Object.entries(object);

  return (state = {}, action) => {
    const newState = {};

    reducers.forEach(([name, reducer]) => {
      const currentState = state[name];

      const nextState = reducer(currentState, action);

      newState[name] = nextState;
    });

    return newState;
  };
};
