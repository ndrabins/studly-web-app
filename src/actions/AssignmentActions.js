import firebase from "firebase";
import keys from "lodash/keys";

import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS
} from "./Types";

export const createAssignment = ({
  assignmentTitle,
  courseId,
  dueDate,
  pointValue,
  description
}) => {
  // const userUid = firebase.auth().currentUser.uid;
  var assignmentData = {
    courseId: courseId,
    assignmentTitle: assignmentTitle,
    dueDate: dueDate,
    pointValue: pointValue,
    description: description,
    dateCreated: new Date()
  };

  // Get a key for a new Post.
  var newAssignmentRef = firebase
    .database()
    .ref()
    .child(`course-assignments/${courseId}`)
    .push();

  return dispatch => {
    newAssignmentRef.set(assignmentData).then(() => {
      dispatch({ type: CREATE_ASSIGNMENT });
    });
    console.log("creating assignment " + assignmentData.assignmentTitle);
  };
};

export const fetchAllAssignments = (courseId) => {
  const assignmentRef = firebase.database().ref(`course-assignments/${courseId}`);
  return dispatch => {
    //begin request
    dispatch({ type: FETCH_ASSIGNMENTS_REQUEST });

    assignmentRef.on("value", snapshot => {
      dispatch({ type: FETCH_ASSIGNMENTS_SUCCESS, payload: snapshot.val() });
    });
  };
};
