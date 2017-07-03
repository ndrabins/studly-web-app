import React, { Component } from "react";
import firebase from "firebase";
// import CodeMirror from "react-codemirror";
import CodeMirror from 'codemirror';
import Firepad from "firepad";

// var CodeMirror = require('codemirror')
// var Firepad = require('firepad')

// class FirepadContainer extends Component {
//   componentDidMount() {
//     const firepadRef = firebase.database().ref();
//     const myCodeMirror = CodeMirror(this._firepadDiv, {
//       lineWrapping: true
//     });

//     // // Create Firepad (with rich text toolbar and shortcuts enabled).
//     const firepad = Firepad.fromCodeMirror(firepadRef, myCodeMirror, {
//       richTextShortcuts: true,
//       richTextToolbar: true,
//       defaultText: "Hello, World!"
//     });
//   }

//   shouldComponentUpdate() {
//     return false;
//   }

//   render() {
//     return <div ref={(c) => this._firepadDiv = c} />;
//   }
// }

class CourseNotes extends Component {
  componentDidMount() {
    // Get Firebase Database reference.
    let firepadRef = firebase.database().ref();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        {richTextShortcuts: true, richTextToolbar: true, defaultText: "Let's get coding!"});
  }

  render() {
    return (
      <div>
        <div>testing </div>
        <div id="firepad"> </div>
        {/*<FirepadContainer />*/}
      </div>
    );
  }
}

export default CourseNotes;
