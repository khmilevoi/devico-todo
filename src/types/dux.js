// @flow
/* eslint-disable no-use-before-define */

export type Action = {
  type: string,
  payload?: any
};

export type ActionCreator<T> = (...any[]) => T;

export type State = {
  [string]: any | State
};

export type Dispatch = (Action | Function) => State;

export type Subscribe = (
  (Action, State) => any
) => () => Array<any | ((Action, State) => any)>;

export type Store = {
  getState: () => State,
  dispatch: Dispatch,
  subscribe: Subscribe
};

export type Reducer = (State, Action) => State;

export type MiddlewareAPI = {
  dispatch: Dispatch
};

export type CreateStore = (Reducer, State, ?AppliedMiddlewares) => Store;

export type AppliedMiddlewares = CreateStore => CreateStore;

export type Middleware<T> = MiddlewareAPI => T;

export type ApplyMiddleware = (...Middleware<any>[]) => AppliedMiddlewares;

export type ThunkAction = Dispatch => any;

export type Thunk = Dispatch => (Action | ThunkAction) => any | Action;

export type CombineReducers = ({ [string]: Reducer }) => Reducer;
