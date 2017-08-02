import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import Calendar from '../components/Calendar';

const styles = {
  container: {
    margin: "15px",
    height: "100%"
  },
  calendarContainer: {
    color: "#303030",
    margin: "20px",
    height: "100%"
  },
  dayContainer : {
    backgroundColor: "#EEEEEE",
    flex:1,
    height:"100%",
    border:"1px solid black",
    margin:"3px"

  }
}

class DashboardContent extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Welcome to Studly</h1>
        <h4>Here is your schedule for the week</h4>
        <div style={styles.calendarContainer}>
          {/* <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div> */}
          <Calendar />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    courses: state.courses.data,
    sideNavOpen: state.utility.sideNavOpen,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);
