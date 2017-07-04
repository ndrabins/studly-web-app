import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";

class CourseChat extends Component {
  componentDidMount(){
    // Get a Firebase Database ref
    var chatRef = firebase.database().ref("chat");

    // // Create a Firechat instance
    var chat = new window.FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
  }

  render() {
    return (
      <div id="firechat-wrapper"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseChat);
