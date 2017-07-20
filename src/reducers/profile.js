import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_IMAGE
} from "../actions/Types";

const initialState = {
  data: [{}],
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return state;
    case UPDATE_PROFILE_IMAGE:
      return state;
    default:
      return state;
  }
}
