import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS
} from "../actions/Types";

const initialState = {
  data: [{}],
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
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
    default:
      return state;
  }
}
