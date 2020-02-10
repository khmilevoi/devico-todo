import { initialState } from 'constants/initialState';
import { lists } from 'constants/actionTypes';

export const listsReducer = (state = initialState.lists, { type, payload }) => {
  switch (type) {
    case lists.PERSONAL.SET: {
      return {
        ...state,
        personal: payload,
      };
    }

    case lists.PERSONAL.ADD: {
      const personal = Array.from(state.personal);
      personal.push(payload);

      return { ...state, personal };
    }

    case lists.PERSONAL.TOGGLE: {
      const personal = state.personal.map((item) => (item.id === payload ? { ...item, isPublic: !item.isPublic } : item));

      const { active } = state;

      if (active && active.id === payload) {
        active.isPublic = !active.isPublic;
      }

      return { ...state, personal, active };
    }

    case lists.PERSONAL.UPDATE: {
      const personal = state.personal.map((item) => (item.id === payload.id ? { ...item, ...payload.data } : item));

      let { active } = state;

      if (active && active.id === payload.id) {
        active = { ...active, ...payload.data };
      }

      return { ...state, personal, active };
    }

    case lists.PERSONAL.DELETE: {
      const personal = state.personal.filter((item) => item.id !== payload);

      return { ...state, personal };
    }

    case lists.SHARED.SET: {
      return {
        ...state,
        shared: payload,
      };
    }

    case lists.SHARED.ADD: {
      const shared = Array.from(state.shared);

      if (!shared.find((item) => item.id === payload.id)) {
        shared.push(payload);
      }

      return { ...state, shared };
    }

    case lists.SHARED.TOGGLE: {
      const shared = state.shared.map((item) => (item.id === payload ? { ...item, isPublic: !item.isPublic } : item));

      const { active } = state;

      if (active && active.id === payload) {
        active.isPublic = !active.isPublic;
      }

      return { ...state, shared, active };
    }

    case lists.SHARED.UPDATE: {
      const shared = state.shared.map((item) => (item.id === payload.id ? { ...item, ...payload.data } : item));

      let { active } = state;

      if (active && active.id === payload.id) {
        active = { ...active, ...payload.data };
      }

      return { ...state, personal: shared, active };
    }

    case lists.SHARED.DELETE: {
      const shared = state.shared.filter((item) => item.id !== payload);

      return { ...state, shared };
    }

    case lists.ACTIVE.SET: {
      return { ...state, active: payload };
    }

    case lists.ACTIVE.DELETE: {
      return { ...state, active: null };
    }

    default:
      return state;
  }
};
