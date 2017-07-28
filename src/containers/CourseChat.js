import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";

class CourseChat extends Component {
  componentDidMount() {
    // Get a Firebase Database ref
    var chatRef = firebase.database().ref(`course-chat/${this.props.selectedCourse}`);

    // // Create a Firechat instance
    this.chat = new window.FirechatUI(
      chatRef,
      document.getElementById("firechat-wrapper")
    );

    let userName = "Anonymous";

    if(this.props.user.displayName){
      userName = this.props.user.displayName;
    }

    this.chat.setUser(this.props.user.uid, userName, function(user) {
      this.chat.resumeSession();
    });
  }

  componentDidUpdate() {
    var chatRef = firebase.database().ref(`course-chat/${this.props.selectedCourse}`);

    this.chat = new window.FirechatUI(
      chatRef,
      document.getElementById("firechat-wrapper")
    );

    let userName = "Anonymous";

    if(this.props.user.displayName){
      userName = this.props.user.displayName;
    }

    this.chat.setUser(this.props.user.uid, userName, function(user) {
      this.chat.resumeSession();
    });
  }

  render() {
    const chatStyle = {
      margin: "30px"
    };

    return <div style={chatStyle} id="firechat-wrapper" />;
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
