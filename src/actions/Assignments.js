import firebase from "firebase";
import keys from "lodash/keys";

import {
  CREATE_ASSIGNMENT
} from "./Types";

export const createAssignment = ({ assignmentTitle, courseId, dueDate, pointValue, description }) => {
  // const userUid = firebase.auth().currentUser.uid;
  var assignmentData = {
    courseId: courseId,
    assignmentTitle: assignmentTitle,
    dueDate: dueDate,
    pointValue : pointValue,
    description: description,
    dateCreated: new Date()
  };

  // Get a key for a new Post.
  var newAssignmentKey = firebase.database().ref().child("course-assignments").push().key;

  var newAssignment = {};
   newAssignment[`/assignments/${newAssignmentKey}`] = assignmentData;
  newAssignment[`/course-assignments/${courseId}/${newAssignmentKey}`] = true;

  // // return firebase.database().ref().update(updates);
  return dispatch => {
    firebase.database().ref().update(newAssignment).then(() => {
      dispatch({ type: CREATE_ASSIGNMENT });
    });
    console.log("creating assignment " + assignmentData.assignmentName);
  };
};
