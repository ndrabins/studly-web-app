import firebase from "firebase";
import {reset} from 'redux-form';

import {
  ADD_COURSE,
  ADD_COURSE_ERROR,
  CREATE_COURSE,
  LEAVE_COURSE,
  SELECT_COURSE,
  FETCH_COURSE_SUCCESS,
  FETCH_ALL_COURSES_REQUEST,
  FETCH_ALL_COURSES_SUCCESS
} from "./Types";

import Map from "lodash/map";

export function selectCourse(courseKey) {
  const courseRef = firebase.database().ref(`courses/${courseKey}`);


  return dispatch => {
    dispatch({ type: SELECT_COURSE, payload: courseKey });

    courseRef.once("value", snapshot => {
      dispatch({ type: FETCH_COURSE_SUCCESS, payload: snapshot.val() });
    });

  };
}

export const createCourse = ({ courseName, teacherName, beginDate, courseColor }) => {
  const userUid = firebase.auth().currentUser.uid;
  let user = {}
  user[userUid] = true;

  // Get a key for a new Post.
  var newCourseKey = firebase.database().ref().child("courses").push().key;
  var classroomChatKey = firebase.database().ref().child(`course-chat/${newCourseKey}`).push().key;

  var courseData = {
    courseOwnerUid: userUid,
    courseName: courseName,
    teacherName: teacherName,
    courseColor: courseColor,
    dateCreated: new Date(),
    users: user,
    classChatId: classroomChatKey,
  };

  var userCourseData = {
    courseName: courseName,
    teacherName: teacherName,
    courseColor: courseColor,
    dateCreated: new Date(),
  }

  var generalChatData = {
    createdAt: new Date(),
    createdByUserId: userUid,
    type: "public",
    name: "Classroom Chat",
    id: classroomChatKey
  }

  // var userData = {
  //   displayName : firebase.auth().currentUser.displayName,
  //   avatar: firebase.auth().currentUser.photoURL
  // }

  var new_course = {};
  new_course["/courses/" + newCourseKey] = courseData;
  new_course["/users/" + userUid + "/courses/" + newCourseKey] = userCourseData;

  //When creating a new course, a general chat channel should be made for the course
  new_course[`course-chat/${newCourseKey}/${classroomChatKey}`] = generalChatData;

  //default teacher should be in the general chat
  //don't need this because we are making every channel public and with all members of a course.

  //this will be needed when we have private channels/messaging
  // new_course[`channel-members/${classroomChatKey}/${userUid}`] = userData;

  return dispatch => {
    dispatch(reset('newCourseForm')); //clear form data
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

//should be renamed joinCourse

/* I AM SO SORRY FOR THIS, THIS NEEDS TO BE REFACTORED */
export const addCourse = ({ courseKey }) => {
  const userUid = firebase.auth().currentUser.uid;
  const courseAssignmentRef = firebase.database().ref(`course-assignments/${courseKey}/`);
  const courseChatRef = firebase.database().ref(`course-chat/${courseKey}/`);

  return dispatch => {
    firebase.database().ref().child('courses').child(courseKey).once("value", snapshot => {
    //check if course exists
      // var classroomChatKey =  snapshot.val().classChatId;
      var userCourseData = {
        courseName: snapshot.val().courseName,
        teacherName: snapshot.val().teacherName,
        courseColor: snapshot.val().courseColor,
        dateCreated:  snapshot.val().dateCreated
      }

      dispatch(reset('joinCourse')); //clear form data

      if(snapshot.val()){
        courseAssignmentRef.once("value", snapshot => {
          //when user joins a course, all the assignments need to be updated in user-assignments
          let assignments = snapshot.val()
          var addUserToCourse = {};
          addUserToCourse[`/courses/${courseKey}/users/${userUid}`] = true;
          addUserToCourse[`/users/${userUid}/courses/${courseKey}`] = userCourseData;

          //for each on assignments
          Map(assignments, (assignment, newAssignmentKey) => {
            addUserToCourse[`user-assignments/${userUid}/${newAssignmentKey}`] = assignment;
          });

          //when a user joins a course they should be added as a member to all public channels
          courseChatRef.orderByChild("type").equalTo("public").once("value", snapshot => {
            let chatRooms = snapshot.val();

            Map(chatRooms, (room, roomKey) => {
              addUserToCourse[`course-chat/${courseKey}/${roomKey}/users/${userUid}`] = true;
            });
          }).then(() => {
            firebase.database().ref().update(addUserToCourse).then(() => {
              dispatch({ type: ADD_COURSE });
            });
          });
        });
      }else{
        dispatch({ type: ADD_COURSE_ERROR });
      }
    });
  };
};

//export const leaveCourse = () => {}
