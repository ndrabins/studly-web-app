import {
  CREATE_ASSIGNMENT
} from "../actions/Types";

const initialState = {

};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
      return state;
    default:
      return state;
  }
}
