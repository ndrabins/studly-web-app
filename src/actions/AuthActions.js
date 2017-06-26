import firebase from "firebase";
import { AUTH_ERROR, AUTH_USER, SIGN_OUT_USER, AUTH_SUCCESS } from "./Types";

export function signUpUser(credentials) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        authSuccess(dispatch, user);
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });


  };
}

export function signInUser(credentials) {
  return dispatch => {
    dispatch({ type: AUTH_USER });

    const { currentUser } = firebase.auth();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => authSuccess(dispatch, user))
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });

      // firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).setValue(firebase.auth().currentUser);
  };
}

export function signOutUser() {
  return function(dispatch) {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: SIGN_OUT_USER
      });
    });
  };
}

export function verifyAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authSuccess(dispatch, user);
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

const authSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};
