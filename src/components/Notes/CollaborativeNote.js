import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import firebase from "firebase";

const firepadContainerStyle = {
  display:"flex",
  flexDirection: "column",
  justifyContent: "stretch",
  alignItems: "stretch",
  flex:3,
  paddingTop: "30px",
  paddingRight: "30px",
  paddingLeft:"30px",
  height:"100%",
};

class CourseNotes extends Component {
  componentDidMount() {
    let firepadRef = firebase
      .database()
      .ref(`/collaborative-note/${this.props.selectedCourse}`);

    // Create CodeMirror (with lineWrapping on).
    this.codeMirror = window.CodeMirror(document.getElementById("firepad"), {
      lineWrapping: true,
      autoRefresh: true
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    this.firepad = window.Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: "Crowdsource your notes with your classmates!",
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
      .ref(`/collaborative-note/${this.props.selectedCourse}`)


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
      <div style={firepadContainerStyle}>
        <div id="firepad">
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
