import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import firebase from "firebase";

import ProfileForm from "./forms/ProfileForm"

import Avatar from 'material-ui/Avatar';
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  profilePage: {
    display: "flex",
    justifyContent: "center",
    margin: "30px",
    borderStyle: "solid"
  }
};

class Profile extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <Avatar size={300} src={this.props.user.photoURL} />
         <RaisedButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.button}
          containerElement="label"
        >
          <input type="file" style={styles.exampleImageInput} />
        </RaisedButton>
        <RaisedButton label="change picture" onClick={() => this.props.actions.updateProfileImage("hello:")} />
        <ProfileForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


