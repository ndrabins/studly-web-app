import {
  CREATE_COURSE_CHAT,
} from "../actions/Types";

const initialState = {
  rooms: [],
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE_CHAT:
      return {
        ...state
      };
    default:
      return state;
  }
}
