import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";

class CourseChat extends Component {
  componentDidMount() {
    // Get a Firebase Database ref
    console.log("chat");
    console.log(this.props.selectedCourse);
    var chatRef = firebase.database().ref(`course-chat/${this.props.selectedCourse}`);

    // // Create a Firechat instance
    this.chat = new window.FirechatUI(
      chatRef,
      document.getElementById("firechat-wrapper")
    );

    this.chat.setUser(this.props.user.uid, "bob", function(user) {
      this.chat.resumeSession();
    });
  }

  componentDidUpdate() {
    console.log("new chat");
    var chatRef = firebase.database().ref(`course-chat/${this.props.selectedCourse}`);

    this.chat = new window.FirechatUI(
      chatRef,
      document.getElementById("firechat-wrapper")
    );

    this.chat.setUser(this.props.user.uid, "bob", function(user) {
      this.chat.resumeSession();
    });
  }

  render() {
    return <div id="firechat-wrapper" />;
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseChat);
