import {
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
  DELETE_ANNOUNCEMENT
} from "../actions/Types";

const initialState = {
  data: [{}],
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT:
      return state;
    case DELETE_ANNOUNCEMENT:
      return state;
    case FETCH_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ANNOUNCEMENTS_SUCCESS:
       return {
        ...state,
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
