import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import Preloader from "../utils/Preloader";

import moment from "moment";
import { Link } from "react-router-dom";

import Map from "lodash/map";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const styles = {
  buttonStyle: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
};

class Assignments extends Component {

  assignmentList() {
    let courseAssignments = this.props.assignments[this.props.selectedCourse];

    const assignmentList = Map(courseAssignments, (assignment, key) => {
      var dueDate = moment(assignment.dueDate).format("llll");
      var dateCreated = moment(assignment.dateCreated).format("llll");

      return (
        <Card key={key}>
          <CardHeader
            title={assignment.assignmentTitle}
            subtitle={`Due Date: ${dueDate}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText style={{}} expandable={true}>
            <div>
              Point Value: {assignment.pointValue}
            </div>
            <div>
              Date Created: {dateCreated}
            </div>
            <div>
              {assignment.description}
              <CardActions
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <FlatButton
                  style={{ color: "#E6463B" }}
                  label="Delete Assignment"
                  onClick={() =>
                    this.props.actions.deleteAssignment(
                      this.props.selectedCourse,
                      key
                    )}
                />
              </CardActions>
            </div>
          </CardText>
        </Card>
      );
    });
    return assignmentList;
  }

  render() {
    if (this.props.loading) {
      return (
        <Preloader />
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
        </div>
        <div style={{ margin: "20px" }}>
          {this.assignmentList()}
        </div>
        <FloatingActionButton
          style={styles.buttonStyle}
          label="addCourse"
          backgroundColor={"#1FA186"}
          containerElement={<Link to={"/dashboard/create-assignment"} />}
        >
          <ContentAdd />
        </FloatingActionButton>
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
