import firebase from "firebase";
import { AUTH_ERROR, AUTH_USER, SIGN_OUT_USER, AUTH_SUCCESS } from "./Types";

export function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();

  return dispatch => {
    dispatch({ type: AUTH_USER });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;

        var user = result.user;
        authSuccess(dispatch, user);
      })
      .catch(function(error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        dispatch(authError(error));
      });
  }


  /* LOGIN WITH REDIRECT */
  // firebase.auth().signInWithRedirect(provider);

  // return dispatch => {
  //   dispatch({ type: AUTH_USER });
  //   firebase
  //     .auth()
  //     .getRedirectResult()
  //     .then(function(result) {
  //       if (result.credential) {
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         var token = result.credential.accessToken;
  //       }
  //       var user = result.user;
  //       user => authSuccess(dispatch, user);
  //     })
  //     .catch(function(error) {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       var email = error.email;
  //       var credential = error.credential;
  //       dispatch(authError(error));
  //     });
  // };
}

export function loginWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();

  return dispatch => {
    dispatch({ type: AUTH_USER });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        var user = result.user;
        authSuccess(dispatch, user);
      })
      .catch(function(error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        dispatch(authError(error));
      });
  };
}

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
        dispatch(authError(error));
      });
  };
}

export function signInUser(credentials) {
  return dispatch => {
    dispatch({ type: AUTH_USER });

    // const { currentUser } = firebase.auth();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => authSuccess(dispatch, user))
      .catch(error => {
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
