import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";

const firepadContainerStyle = {};

const firepadStyle = {
  flex: 1
};

class CourseNotes extends Component {
  componentDidMount() {
    let firepadRef = firebase
      .database()
      .ref(`/courses/${this.props.selectedCourse}`);

    // Create CodeMirror (with lineWrapping on).
    this.codeMirror = window.CodeMirror(document.getElementById("firepad"), {
      lineWrapping: true,
      autoRefresh: true
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    this.firepad = window.Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: "Let's get coding!",
      userId: this.props.user.uid
    });
  }

  componentDidUpdate() {

    //Delete old firepad, clear codemirror text so that new
    //firepad can be instantiated
    this.firepad.dispose();
    this.codeMirror.clearHistory();
    this.codeMirror.setValue("");

    let firepadRef = firebase
      .database()
      .ref(`/courses/${this.props.selectedCourse}`)


    // Create firepad with new ref
    this.firepad = window.Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: "Create your course notes here!",
      userId: this.props.user.uid
    });
  }

  render() {
    return (
      <div id="firepad-container">
        <div id="firepad" style={firepadStyle}>
          {" "}
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
