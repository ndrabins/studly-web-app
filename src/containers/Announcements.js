import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import moment from "moment";
import { Link } from "react-router-dom";

import Map from "lodash/map";

import RaisedButton from "material-ui/RaisedButton";

import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import CreateAnnouncementForm from "./forms/CreateAnnouncementForm";

const styles = {
  announcementStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonStyle: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}

class Announcements extends Component {
  render() {
    return (
      <div style={styles.announcementStyle}>
        <h2>Announcements</h2>
        <CreateAnnouncementForm />
        <FloatingActionButton
          style={styles.buttonStyle}
          label="addCourse"
          backgroundColor = {"#1FA186"}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);

