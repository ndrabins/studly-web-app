import firebase from "firebase";
import moment from "moment";

import {
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
  DELETE_ANNOUNCEMENT,
} from "./Types";

export const createAnnouncement = ({
  courseId,
  title,
  description
}) => {
  // const userUid = firebase.auth().currentUser.uid;
  let dateCreated = moment();
  dateCreated = dateCreated.toString();

  let announcementData = {
    courseId: courseId,
    title: title,
    description: description,
    dateCreated: dateCreated
  };


  // Get a key for a new Post.
  var newAnnouncementRef = firebase.database().ref().child(`course-announcements/${courseId}`).push();

  return dispatch => {
    newAnnouncementRef.set(announcementData).then(() => {
      dispatch({ type: CREATE_ANNOUNCEMENT });
    });
  };
};

export const deleteAnnouncement = () =>{

}

export const fetchAnnouncements = (courseId) =>{
  const announcementRef = firebase.database().ref(`course-announcements/${courseId}`);
  return dispatch => {
    //begin request
    dispatch({ type: FETCH_ANNOUNCEMENTS_REQUEST });

    announcementRef.on("value", snapshot => {
      dispatch({ type: FETCH_ANNOUNCEMENTS_SUCCESS, payload: snapshot.val() });
    });
  };
}
