export const initialState = {
  auth: {
    user: null,
    error: null,
  },
  todos: {
    list: {},
  },
  lists: {
    personal: [],
    shared: [],
    active: null,
  },
  error: {
    list: [],
  },
  localStorage: null,
  share: {
    list: null,
    users: [],
  },
};
