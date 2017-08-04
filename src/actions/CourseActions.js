import firebase from "firebase";

import {
  ADD_COURSE,
  ADD_COURSE_ERROR,
  CREATE_COURSE,
  LEAVE_COURSE,
  SELECT_COURSE,
  FETCH_ALL_COURSES_REQUEST,
  FETCH_ALL_COURSES_SUCCESS
} from "./Types";

export function selectCourse(courseKey) {
  return dispatch => {
    dispatch({ type: SELECT_COURSE, payload: courseKey });
  };
}

export const createCourse = ({ courseName, teacherName, beginDate }) => {
  const userUid = firebase.auth().currentUser.uid;
  var courseData = {
    courseOwnerUid: userUid,
    courseName: courseName,
    teacherName: teacherName,
    dateCreated: new Date(),
    users: userUid
  };

  // Get a key for a new Post.
  var newCourseKey = firebase.database().ref().child("courses").push().key;

  // // Write the new post's data simultaneously in the posts list and the user's post list.
  var new_course = {};
  new_course["/courses/" + newCourseKey] = courseData;
  new_course["/users/" + userUid + "/courses/" + newCourseKey] = courseData.courseName;

  return dispatch => {
    firebase.database().ref().update(new_course).then(() => {
      dispatch({ type: CREATE_COURSE });
    });
  };
};

export const fetchAllCourses = () => {
  const userUid = firebase.auth().currentUser.uid;

  // TODO: possible refactoring needed here. Storing course information under /user/ and /course/
  return dispatch => {
    //begin request
    dispatch({ type: FETCH_ALL_COURSES_REQUEST });

    firebase
      .database()
      .ref(`users/${userUid}/courses`)
      .on("value", snapshot => {

        dispatch({ type: FETCH_ALL_COURSES_SUCCESS, payload: snapshot.val() });
        // let courseKeys = snapshot.val().keys();
      });
  };
};

export const addCourse = ({ courseKey }) => {
  const userUid = firebase.auth().currentUser.uid;

  return dispatch => {
    firebase.database().ref().child('courses').child(courseKey).on("value", snapshot => {
      if(snapshot.val()){
        let courseName = snapshot.val().courseName;
        var addUserToCourse = {};
        addUserToCourse[`/courses/${courseKey}/users/${userUid}`] = true;
        addUserToCourse[`/users/${userUid}/courses/${courseKey}`] = courseName;

        firebase.database().ref().update(addUserToCourse).then(() => {
          dispatch({ type: ADD_COURSE });
        });
        //Need to take all course-assignments for course and append it to user-assignemnts/{userUID}
      }else{
        console.log("course does not exist");
        dispatch({ type: ADD_COURSE_ERROR });
      }
    });
  };
};

//export const leaveCourse = () => {}
