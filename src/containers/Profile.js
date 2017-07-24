import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import firebase from "firebase";

import ProfileForm from "./forms/ProfileForm";

import RaisedButton from "material-ui/RaisedButton";

const styles = {
  profilePage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px",
    borderStyle: "solid",
    flexDirection: "column"
  },
};

class Profile extends Component {
  render() {
    return (
      <div style={styles.profilePage}>
        <ProfileForm/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
