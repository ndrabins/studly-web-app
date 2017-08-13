import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import PrivateNote from "../components/Notes/PrivateNote";
import CollaborativeNote from "../components/Notes/CollaborativeNote";
import NoteList from "../components/Notes/NoteList";


const styles = {
  NoteContainer: {
    display: "flex",
    justifyContent: "center",
    margin:30,
    height: "100%"
  },
  CourseNotes: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
}
const NoteContainer = {
  display: "flex",
  justifyContent: "center",
  margin:30,
  height: "100%"
};

class CourseNotes extends Component {


  render() {
    return (
      <div style={styles.CourseNotes} >
        <NoteList />
        {/* <PrivateNote /> */}
        <div style={styles.NoteContainer}>
          <CollaborativeNote />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedCourse: state.courses.selectedCourse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseNotes);
