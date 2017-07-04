import React, { Component } from "react";
import firebase from "firebase";

class CourseNotes extends Component {
  componentDidMount() {
    let firepadRef = firebase.database().ref();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = window.CodeMirror(document.getElementById("firepad"), {
      lineWrapping: true
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: "Let's get coding!"
    });
  }

  render() {
    return <div id="firepad" />;
  }
}

export default CourseNotes;
