import firebase from "firebase";
import moment from "moment";

import Map from "lodash/map";

import {
  CREATE_ASSIGNMENT,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_USER_ASSIGNMENTS_REQUEST,
  FETCH_USER_ASSIGNMENTS_SUCCESS,
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
    title: assignmentTitle,
    dueDate: dueDateString,
    pointValue: pointValue,
    description: description,
    dateCreated: dateCreated
  };

  var newAssignmentKey = firebase.database().ref().child(`course-assignments/${courseId}`).push().key;

  var new_assignment = {};
  new_assignment[`course-assignments/${courseId}/${newAssignmentKey}`] = assignmentData;
  //Find all users in the course and update all their personal assignments
  return dispatch => {

    const courseUsersRef = firebase.database().ref(`courses/${courseId}/users`);
    courseUsersRef.once("value", snapshot => {
      Map(snapshot.val(), (user, userUid) => {
        new_assignment[`user-assignments/${userUid}/${newAssignmentKey}`] = assignmentData;
      });
      firebase.database().ref().update(new_assignment).then(() => {
        dispatch({ type: CREATE_ASSIGNMENT });
      });
    });
  }
};

export const deleteAssignment = (courseId, assignmentId) => {
  var delete_assignment = {};
  delete_assignment[`course-assignments/${courseId}/${assignmentId}`] = null;

  //Delete assignment for all users in course
  return dispatch => {
    const courseUsersRef = firebase.database().ref(`courses/${courseId}/users`);
    courseUsersRef.once("value", snapshot => {
      Map(snapshot.val(), (user, userUid) => {
        delete_assignment[`user-assignments/${userUid}/${assignmentId}`] = null;
      });
      firebase.database().ref().update(delete_assignment).then(() => {
        dispatch({ type: DELETE_ASSIGNMENT });
      });
    });
  }
};

export const fetchCourseAssignments = courseKey => {
  const courseRef = firebase.database().ref(`course-assignments/${courseKey}`);

  return dispatch => {
    dispatch({ type: FETCH_ASSIGNMENTS_REQUEST });

    courseRef.on("value", snapshot => {
      dispatch({ type: FETCH_ASSIGNMENTS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const fetchUserAssignments = () => {
  const userUid = firebase.auth().currentUser.uid;

  const allUserAssignmentsRef = firebase.database().ref(`user-assignments/${userUid}/`);

  return dispatch => {
    dispatch({ type: FETCH_USER_ASSIGNMENTS_REQUEST });

    allUserAssignmentsRef.on("value", snapshot => {
      dispatch({ type: FETCH_USER_ASSIGNMENTS_SUCCESS, payload: snapshot.val() });
    });
  };
}

