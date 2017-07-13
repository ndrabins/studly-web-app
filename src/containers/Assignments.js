import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import moment from "moment"
import { Link } from "react-router-dom";

import Map from "lodash/map";

import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const assignmentListStyle = {
  margin: "20px"
};

class Assignments extends Component {
  componentDidMount() {
    this.props.actions.fetchAllAssignments(this.props.selectedCourse);
  }

  assignmentList() {
    const assignmentList = Map(this.props.assignments, (assignment, key) => {
      var dueDate = moment(assignment.dueDate).format("dddd, MMMM Do YYYY, h:mm:ss")

      return (
        <Card key={key}>
          <CardHeader
            title={assignment.assignmentTitle}
            subtitle={dueDate}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            {assignment.description}
          </CardText>
        </Card>
      );
    });
    return assignmentList;
  }

  render() {
    if (this.props.loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2>Assignments</h2>
          <RaisedButton
            label="Create Assignment"
            containerElement={<Link to={`/dashboard/create-assignment`} />}
          />
        </div>
        <div style={{ margin: "20px" }}>
          {this.assignmentList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assignments: state.assignments.data,
    selectedCourse: state.courses.selectedCourse,
    loading: state.assignments.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
