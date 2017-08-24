import firebase from "firebase";
import moment from "moment";

import {
  CREATE_NOTE,
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  SELECT_NOTE,
  SAVE_NOTE,
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
    title: moment().format('MMMM Do YYYY'),
    content: "",
    preview: "",
    courseId: courseId,
  };

  return dispatch => {
    noteRef.child(`${noteKey}`).set(noteData).then(() => {
      dispatch({ type: CREATE_NOTE });

      //this is so thaton new note, it becomes selected
      // dispatch({
      //   type: SELECT_NOTE,
      //   payload: noteKey
      // });
    });
  };
};

export const saveNote = (updatedNote, noteKey) => {
  const userId = firebase.auth().currentUser.uid;
  const courseId = updatedNote.courseId;
  const noteRef = firebase.database().ref(`privateNotes/${courseId}/${userId}/${noteKey}`);

  return dispatch => {
    noteRef.set(updatedNote).then(() => {
      dispatch({ type: SAVE_NOTE });
    });
  };
}

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

export const selectNote = (noteKey) => {
  return dispatch => {
    dispatch({
      type: SELECT_NOTE,
      payload: noteKey
    });
  }
}
