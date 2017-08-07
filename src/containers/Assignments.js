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
import NoAssignments from "../static/homework.svg"

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const styles = {
  assignmentStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  assignmentDetail: {
    width: "80%",
    margin: "0px",
    padding: "10px"
  },
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
  componentDidMount(){
    this.props.actions.fetchCourseAssignments(this.props.selectedCourse);
  }

  assignmentList() {
    let courseAssignments = this.props.assignments;

    if(!courseAssignments){
      return (
        <div style={styles.assignmentStyle}>
          <h3>You don't have any assignments yet! </h3>
          <img src={NoAssignments} style={{height:"50%", width:"50%", marginTop:"100px" }}></img>
        </div>
      );
    }

    const assignmentList = Map(courseAssignments, (assignment, key) => {
      var dueDate = moment(assignment.dueDate).format("llll");
      var dateCreated = moment(assignment.dateCreated).format("llll");

      return (
        <Card style={styles.assignmentDetail} key={key}>
          <CardHeader
            title={assignment.title}
            subtitle={`Due Date: ${dueDate}`}
            actAsExpander={true}
            showExpandableButton={true}
            iconStyle={{color:"#000000"}}
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
      <div style={styles.assignmentStyle}>
        <h2>Assignments</h2>
        {this.assignmentList()}
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
