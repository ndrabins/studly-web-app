import firebase from "firebase";

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

  var userData = {
    displayName : firebase.auth().currentUser.displayName,
    avatar: firebase.auth().currentUser.photoURL
  }

  var new_course = {};
  new_course["/courses/" + newCourseKey] = courseData;
  new_course["/users/" + userUid + "/courses/" + newCourseKey] = userCourseData;

  //When creating a new course, a general chat channel should be made for the course
  new_course[`course-chat/${newCourseKey}/${classroomChatKey}`] = generalChatData;
  //default teacher should be in the general chat
  new_course[`channel-members/${classroomChatKey}/${userUid}`] = userData;

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

//should be renamed joinCourse
export const addCourse = ({ courseKey }) => {
  const userUid = firebase.auth().currentUser.uid;
  const courseAssignmentRef = firebase.database().ref(`course-assignments/${courseKey}/`);

   var userData = {
    displayName : firebase.auth().currentUser.displayName,
    avatar: firebase.auth().currentUser.photoURL
  }

  return dispatch => {
    firebase.database().ref().child('courses').child(courseKey).once("value", snapshot => {
    //check if course exists
      var classroomChatKey =  snapshot.val().classChatId;
      var userCourseData = {
        courseName: snapshot.val().courseName,
        teacherName: snapshot.val().teacherName,
        courseColor: snapshot.val().courseColor,
        dateCreated:  snapshot.val().dateCreated
      }


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

          //when user joins a course they should be in course chat
          addUserToCourse[`/channel-members/${classroomChatKey}/${userUid}`] = userData;

          firebase.database().ref().update(addUserToCourse).then(() => {
            dispatch({ type: ADD_COURSE });
          });
        });
      }else{
        dispatch({ type: ADD_COURSE_ERROR });
      }
    });
  };
};

//export const leaveCourse = () => {}
