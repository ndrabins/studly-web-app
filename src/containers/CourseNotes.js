import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";

const firepadContainerStyle = {

};

const firepadStyle = {
  flex: 1
};

class CourseNotes extends Component {
  componentDidMount() {
    let firepadRef = firebase.database().ref();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = window.CodeMirror(document.getElementById("firepad"), {
      lineWrapping: true,
      autoRefresh: true
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: "Let's get coding!",
      userId: this.props.user.uid
    });

  }

  render() {
    return (
      <div id="firepad-container">
        <div id="firepad" style={firepadStyle}> </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseNotes);
