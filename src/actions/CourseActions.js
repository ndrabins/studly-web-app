import firebase from "firebase";

import {
  ADD_COURSE,
  CREATE_COURSE,
  LEAVE_COURSE,
  FETCH_ALL_COURSES,
  FETCH_COURSE
} from "./Types";
// export function fetchUserCourses();

// export function createCourse();

export const createCourse = ({ courseName }) => {
  const userUid = firebase.auth().currentUser.uid;

  var courseData = {
    adminUid : userUid,
    courseName : courseName
  };

  // var newCourseKey = firebase.database().ref().child('courses').push().key;

  // var updates = {};
  // updates['/courses/' + newCourseKey] = courseData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  // return firebase.database().ref().update(updates);

  return dispatch => {
    console.log("creating course" + courseName)
    dispatch({ type: CREATE_COURSE, payload: "courseName" });
  };
};

// export function leaveCourse();

// export function addCourse();

// export const employeeCreate = ({ name, phone, shift }) => {
//   const { currentUser } = firebase.auth();

//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .push({ name, phone, shift })
//       .then(() => {
//         dispatch({ type: EMPLOYEE_CREATE });
//         Actions.employeeList({ type: 'reset' });
//       });
//   };
// };

// export const employeesFetch = () => {
//   const { currentUser } = firebase.auth();

//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .on('value', snapshot => {
//         dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
//       });
//   };
// };

// export const employeeDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth();

//   return () => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
//       .remove()
//       .then(() => {
//         Actions.employeeList({ type: 'reset' });
//       });
//   };
// };
