import firebase from 'firebase';
import store from '../index';

// import Firepad from 'firepad';
// import CodeMirror from 'codemirror';

export default function makeFirepads() {
	let userId = store.getState().auth.user.uid;
  var firepadRef = firebase.database().ref(`/users/${userId}/javascript`);

  var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

  // Create Firepad (with rich text toolbar and shortcuts enabled).
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
      { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });

  return firepad;
}
