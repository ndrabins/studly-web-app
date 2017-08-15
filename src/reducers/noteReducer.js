import {
  DELETE_NOTE,
  CREATE_NOTE,
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS
} from "../actions/Types";

const initialState = {
  privateNotes: [],
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case DELETE_NOTE:
      return state;
    case CREATE_NOTE:
      return state;
    case FETCH_NOTES_REQUEST:
      return state;
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        privateNotes: action.payload
      };
    default:
      return state;
  }
}
