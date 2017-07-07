import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS
} from "../actions/Types";

const initialState = {
  data: [],
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
      return state;
    case FETCH_ASSIGNMENTS_REQUEST:
      return state;
    case FETCH_ASSIGNMENTS_SUCCESS:
       return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
