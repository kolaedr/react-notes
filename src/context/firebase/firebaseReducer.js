import { SHOW_LOADER, HIDE_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTES } from "../types";

const hendlers = {
  DEFAULT: (state) => state,
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload],
  }),
  [FETCH_NOTES]: (state, { payload }) => ({
    ...state,
    notes: payload,
    loading: false
  }),
  [REMOVE_NOTES]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),
};

export const firebaseReducer = (state, action) => {
  const handel = hendlers[action.type] || hendlers.DEFAULT;
  return handel(state, action);
};
