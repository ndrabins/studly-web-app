import {
  ADD_COURSE,
  ADD_COURSE_ERROR,
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
  fetchingAllCourses: false,
  joinCourseError: false,
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state
      };
    case ADD_COURSE:
      return  {
        ...state,
        joinCourseError: false
       }
    case ADD_COURSE_ERROR:
      return {
        ...state,
        joinCourseError: true
       }
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
