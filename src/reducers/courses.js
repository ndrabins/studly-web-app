import {
  ADD_COURSE,
  CREATE_COURSE,
  LEAVE_COURSE,
  FETCH_ALL_COURSES,
  FETCH_COURSE
} from "../actions/Types";

const initialState = {
  data: []
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        data: action.payload
      };
    // case FETCH_FAVORITED_GIFS:
    //   var arr = [];
    //   for (var i in action.payload) {
    //     if (action.payload.hasOwnProperty(i)) {
    //       arr.push(action.payload[i]);
    //     }
    //   }
    //   return {
    //     ...state,
    //     favorites: arr
    //   };
    case ADD_COURSE:
      return state;
    case LEAVE_COURSE:
      return state;
    case FETCH_ALL_COURSES:
      return state;
    case FETCH_COURSE:
      return state;
    default:
      return state;
  }
}
