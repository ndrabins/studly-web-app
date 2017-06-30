import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from 'firebase';
//  import firechat from 'firechat';

class CourseChat extends Component {
  componentDidMount() {
    // var chatRef = firebase.database().ref("chat");

    // var chat = new Firechat(chatRef);
    // chat.setUser(this.props.user.uid, "userName", function(user) {
    //   chat.resumeSession();
    // });
    // Create a Firechat instance
    // var chat = new FirechatUI(
    //   chatRef,
    //   document.getElementById("firechat-wrapper")
    // );

    // Set the Firechat user
    // chat.setUser(this.props.user.uid, this.props.user.displayName);
  }

  render() {
    return (
      <div id="firechat-wrapper">
        chat
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseChat);
