import {
  ADD_COURSE,
  CREATE_COURSE,
  LEAVE_COURSE,
  SELECT_COURSE,
  FETCH_ALL_COURSES_REQUEST,
  FETCH_ALL_COURSES_FAILURE,
  FETCH_ALL_COURSES_SUCCESS,
  FETCH_COURSE,
  FETCH_COURSE_SUCCESS
} from "../actions/Types";

const initialState = {
  data: [],
  fetchingAllCourses: false
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
    case SELECT_COURSE:
      return {
        ...state,
        selectedCourse: action.payload
       }
    case FETCH_ALL_COURSES_FAILURE:
      return state;
    case FETCH_ALL_COURSES_REQUEST:
      return {
        ...state,
        fetchingAllCourses: true
      }
    case FETCH_ALL_COURSES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetchingAllCourses: false
      };
    case FETCH_COURSE:
      return state;
    case FETCH_COURSE_SUCCESS:
      return state;
    default:
      return state;
  }
}
