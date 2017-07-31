import firebase from "firebase";

import { UPDATE_PROFILE, UPDATE_PROFILE_IMAGE, FETCH_PROFILE } from "./Types";

// var storageRef = firebase.storage().ref();
//  var storage = firebase.storage()

export const updateProfileImage = (image, userID) => {
  var storage = firebase.storage();
  var storageRef = storage.ref(`profilePicture/${userID}.png`);

  storageRef.put(image).then(function(snapshot) {

  });

  return dispatch => {
    //begin request
    storageRef.getDownloadURL().then(function(url) {
      dispatch({ type: UPDATE_PROFILE_IMAGE });
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          photoURL: url
        })
        .then(
          function() {
            // Update successful.
          },
          function(error) {
            // An error happened.
          }
        );
    });
  };
};

export const updateProfile = (values) => {
  //name, displayName, age, grade, schoolName, majorFavoriteSubject
  let profileData = {
    name: values["name"],
    age: values["age"],
    grade: values["grade"],
    schoolName: values["schoolName"],
    majorFavoriteSubject: values["majorFavoriteSubject"],
  }

  let user = firebase.auth().currentUser;
  const userUid = user.uid;
  const userRef = firebase.database().ref(`users/${userUid}`)

  //TODO
  //get all form variables

  //update the variables in auth.user,
  //update our own user variables

  return dispatch => {
    user.updateProfile({displayName: values["displayName"]})
    userRef.update(profileData).then(() => {
     dispatch({ type: UPDATE_PROFILE });
    });
  };
};

export const fetchProfile = () => {

  let user = firebase.auth().currentUser;
  const userUid = user.uid;
  const userRef = firebase.database().ref(`users/${userUid}`)

  return dispatch => {
    userRef.on("value", snapshot => {
      dispatch({ type: FETCH_PROFILE, payload: snapshot.val()})
    });
  };
}
