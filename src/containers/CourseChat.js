import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from "firebase";
import firechat from "firechat";

class CourseChat extends Component {
  componentDidMount() {
    var chatRef = firebase.database().ref("firechat");



    // var chat = firechat.FirechatUi(
    //   chatRef,
    //   document.getElementById("firechat-wrapper")
    // );
    // chat.setUser(this.props.user.uid, "bob");
  }

  render() {
    // return <div id="firechat-wrapper">chat</div>;
    return <div> chat </div>;
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
