import firebase from "firebase";
import keys from "lodash/keys";
import forEach from "lodash/forEach";

import {
  ADD_COURSE,
  CREATE_COURSE,
  LEAVE_COURSE,
  FETCH_ALL_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_SUCCESS
} from "./Types";

export const createCourse = ({ courseName, teacherName, beginDate }) => {
  const userUid = firebase.auth().currentUser.uid;
  var courseData = {
    courseOwnerUid: userUid,
    courseName: courseName,
    teacherName: teacherName,
    dateCreated: new Date()
  };

  // Get a key for a new Post.
  var newCourseKey = firebase.database().ref().child("courses").push().key;

  // // Write the new post's data simultaneously in the posts list and the user's post list.
  var new_course = {};
  new_course["/courses/" + newCourseKey] = courseData;
  new_course["/users/" + userUid + "/courses/" + newCourseKey] = true;

  // // return firebase.database().ref().update(updates);
  return dispatch => {
    firebase.database().ref().update(new_course).then(() => {
      dispatch({ type: CREATE_COURSE });
    });
    console.log("creating course " + courseName);
  };
};

// return dispatch => {
//   firebase.database().ref().child('courses')
//   .push({ courseData })
//   .then(() => {
//       dispatch({ type: CREATE_COURSE });
//     });
//   console.log("creating course " + courseName)

export const courseFetch = () => {
  const userUid = firebase.auth().currentUser.uid;
  const courseRef = firebase.database().ref("courses/");

  let data = [];

  return dispatch => {
    firebase
      .database()
      .ref(`users/${userUid}/courses`)
      .on("value", snapshot => {
        let courseKeys = keys(snapshot.val());
        forEach(courseKeys, function(key) {
          firebase.database().ref(`courses/${key}`).on("value", snapshot => {
            data.append(snapshot.val());
          });
          dispatch({ type: FETCH_ALL_COURSES, payload: data });
        });
      });
  };
};