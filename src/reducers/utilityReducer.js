import {
  TOGGLE_SIDENAV,
} from "../actions/Types";

const initialState = {
  sideNavOpen: true
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDENAV:
      return {
        ...state,
        sideNavOpen: action.payload
      };
    default:
      return state;
  }
}
