import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import moment from "moment";
import Map from "lodash/map";
import Flatten from "lodash/flatten";

import Calendar from "../components/Calendar";

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
  dayContainer: {
    backgroundColor: "#EEEEEE",
    flex: 1,
    height: "100%",
    border: "1px solid black",
    display: 'block',
    margin: "3px"
  }
};

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getEvents() {
    let allAssignments = this.props.assignments;

    let assignmentEvents = Map(
      allAssignments,
      (assignment, assignmentKey) => {
        let eventColor = this.props.courses[assignment.courseId].courseColor;

        let dueDate = moment(assignment.dueDate).toDate();
        let endDate = moment(assignment.dueDate).add(1, "hour").toDate();
        assignment["dueDate"] = dueDate;
        assignment["endDate"] = endDate;
        assignment["hexColor"] = eventColor; //this will change to be different for each course..
        return assignment;
      }
    );
    return Flatten(assignmentEvents);
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Welcome to Studly</h1>
        <h4>Here is your schedule for the week</h4>
        <div style={styles.calendarContainer}>
          <Calendar events={this.getEvents()} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assignments: state.assignments.userAssignments,
    loading: state.assignments.loading,
    courses: state.courses.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);
