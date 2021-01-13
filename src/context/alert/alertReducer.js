import { SHOW_ALERT, HIDE_ALERT } from "../types";

const hendlers = {
  DEFAULT: (state) => state,
  [SHOW_ALERT]: (state, {payload}) => ({ ...payload, visible: true }),
  [HIDE_ALERT]: (state) => ({ ...state, visible: false }),
  
};

export const alertReducer = (state, action) => {
  const handel = hendlers[action.type] || hendlers.DEFAULT;
  return handel(state, action);
};
