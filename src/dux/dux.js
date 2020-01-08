export const createStore = (reducer, initialState = {}, middleware) => {
  let state = initialState;

  const listeners = [];

  if (typeof middleware === 'function') {
    return middleware(createStore)(reducer, initialState);
  }

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);

      listeners.forEach((listener) => listener(state));

      return state;
    },
    subscribe: (listener) => {
      listeners.push(listener);

      return () => listeners.splice(listeners.indexOf(listener), 1);
    },
  };
};
