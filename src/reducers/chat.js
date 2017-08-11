import {
  CREATE_COURSE_CHAT,
  CREATE_CHANNEL,
  FETCH_COURSE_CHANNELS_SUCCESS,
  FETCH_COURSE_CHANNELS_REQUEST,
  CREATE_MESSAGE,
  FETCH_CHANNEL_MESSAGES_REQUEST,
  FETCH_CHANNEL_MESSAGES_SUCCESS,
  SELECT_CHANNEL
} from "../actions/Types";

const initialState = {
  channels: [],
  messages: null,
  selectedChannel: null,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE_CHAT:
      return state;
    case CREATE_CHANNEL:
      return state;
    case FETCH_CHANNEL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case CREATE_MESSAGE:
      return state;
    case SELECT_CHANNEL:
      return {
        ...state,
        selectedChannel: action.payload
      };
    case FETCH_COURSE_CHANNELS_REQUEST:
      return state;
    case FETCH_COURSE_CHANNELS_SUCCESS:
      return {
        ...state,
        channels : action.payload,
      };
    default:
      return state;
  }
}
