import firebase from "firebase";
import moment from "moment";

import Map from "lodash/map";

import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  DELETE_ASSIGNMENT
} from "./Types";

export const createAssignment = ({
  assignmentTitle,
  courseId,
  dueDate,
  pointValue,
  description
}) => {
  // const userUid = firebase.auth().currentUser.uid;
  var dateCreated = moment();
  dateCreated = dateCreated.toString();
  var dueDateString = dueDate.toString();

  var assignmentData = {
    courseId: courseId,
    assignmentTitle: assignmentTitle,
    dueDate: dueDateString,
    pointValue: pointValue,
    description: description,
    dateCreated: dateCreated
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
  };
};

export const deleteAssignment = (courseId, assignmentId) => {
  const assignmentRef = firebase
    .database()
    .ref(`course-assignments/${courseId}`);

  return dispatch => {
    dispatch({ type: DELETE_ASSIGNMENT });
    assignmentRef.child(assignmentId).remove();
  };
};

export const fetchAllAssignments = courseKeys => {
  // const assignmentRef = firebase.database().ref(`course-assignments/${courseId}`);
  let data = {};

  return dispatch => {
    dispatch({ type: FETCH_ASSIGNMENTS_REQUEST });

    // Promise.all().
    Map(courseKeys, (courseName, courseKey) => {
      let assignmentRef = firebase
        .database()
        .ref(`course-assignments/${courseKey}`);

      assignmentRef.on("value", snapshot => {
        data[courseKey] = snapshot.val();
      });
    });
    dispatch({ type: FETCH_ASSIGNMENTS_SUCCESS, payload: data });
  };
};
