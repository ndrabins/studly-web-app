import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  DELETE_ASSIGNMENT,
  FETCH_USER_ASSIGNMENTS_REQUEST,
  FETCH_USER_ASSIGNMENTS_SUCCESS,
} from "../actions/Types";

const initialState = {
  data: null,
  userAssignments: null,
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
      return state;
    case DELETE_ASSIGNMENT:
      return state;
    case FETCH_ASSIGNMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ASSIGNMENTS_SUCCESS:
       return {
        ...state,
        data: action.payload,
        loading: false
      };
    case FETCH_USER_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        userAssignments: action.payload,
        loading: false
      };
    case FETCH_USER_ASSIGNMENTS_REQUEST:
      return{
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
