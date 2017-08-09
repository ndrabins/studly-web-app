//Data structure
/*
  course-chat/
    {courseId}/
      {channelId}/
        createdAt
        createdByUserId
        channelId
        name
        type (private or public)

  channel-messages/
    {channelId}/
      {messageId}/
        userId
        name
        message
        timestamp
        avatar

  channel-members/
    {channelId}/
      {userId}/
        displayName
        avatar

*/
import firebase from "firebase";
import moment from "moment";

import {
  FETCH_COURSE_CHANNELS_SUCCESS,
  FETCH_COURSE_CHANNELS_REQUEST,
  FETCH_CHANNEL_MESSAGES_REQUEST,
  FETCH_CHANNEL_MESSAGES_SUCCESS,
  CREATE_MESSAGE,
  SELECT_CHANNEL
} from "./Types.js";

export const fetchCourseChannels = courseId => {
  console.log("fetching course channels");
  return dispatch => {
    dispatch({ type: FETCH_COURSE_CHANNELS_REQUEST });

    firebase
      .database()
      .ref(`course-chat/${courseId}/`)
      .on("value", snapshot => {
        dispatch({
          type: FETCH_COURSE_CHANNELS_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const fetchChannelMembers = channelId => {};

export const selectChannel = channelId => {
  const messageRef = firebase.database().ref(`channel-messages/${channelId}`);

  return dispatch => {
    dispatch({ type: SELECT_CHANNEL, payload: channelId});

    messageRef.on("value", snapshot => {
      console.log(snapshot.val());
      dispatch({
        type: FETCH_CHANNEL_MESSAGES_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const createMessage = (message, channelId) => {
  let userId = firebase.auth().currentUser.uid;
  let avatar = firebase.auth().currentUser.photoURL;
  let displayName = firebase.auth().currentUser.displayName;
  let timestamp = moment();
  timestamp = timestamp.toString();

  let messageData = {
    userId: userId,
    message: message,
    timestamp: timestamp,
    avatar: avatar,
    displayName: displayName
  };

  // Get a key for a new Post.
  var newMessageRef = firebase
    .database()
    .ref()
    .child(`channel-messages/${channelId}`)
    .push();

  return dispatch => {
    newMessageRef.set(messageData).then(() => {
      dispatch({ type: CREATE_MESSAGE });
    });
  };
};