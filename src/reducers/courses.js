import {
  ADD_COURSE,
  CREATE_COURSE,
  LEAVE_COURSE,
  FETCH_ALL_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_SUCCESS
} from "../actions/Types";

const initialState = {
  data: []
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state
      };
    case ADD_COURSE:
      return state;
    case LEAVE_COURSE:
      return state;
    case FETCH_ALL_COURSES:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_COURSE:
      return state;
    case FETCH_COURSE_SUCCESS:
      return state;
    default:
      return state;
  }
}
