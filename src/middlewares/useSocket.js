export const useSocket = (store, params, socket) => {
  Object.entries(params).forEach(([event, listener]) => {
    socket.on(event, (...args) => listener(store.dispatch, ...args));
  });

  return store;
};
