import firebase from "firebase";
import moment from "moment";

import {
  CREATE_NOTE,
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
} from "./Types.js";


export const createNote = (courseId) => {
  const userId = firebase.auth().currentUser.uid;
  const noteRef = firebase.database().ref(`privateNotes/${courseId}/${userId}`);
  const noteKey = noteRef.push().key;

  let dateNow = moment().toString();

  let noteData = {
    createdAt: dateNow,
    updatedAt: dateNow,
    createdByUserId: userId,
    title: "New Note",
    content: "",
  };

  console.log(noteData);

  return dispatch => {
    noteRef.child(`${noteKey}`).set(noteData).then(() => {
      dispatch({ type: CREATE_NOTE });
    });
  };
};

export const fetchPrivateNotes = (courseId) => {
  const userId = firebase.auth().currentUser.uid;

  const noteRef = firebase.database().ref(`privateNotes/${courseId}/${userId}`);

  return dispatch => {
    dispatch({ type: FETCH_NOTES_REQUEST });

    noteRef.on("value", snapshot => {
      dispatch({
        type: FETCH_NOTES_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
}
