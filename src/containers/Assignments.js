import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from "react-router-dom";

import map from "lodash/map";
import forEach from "lodash/forEach";

import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';

//https://github.com/react-component/collapse
import "rc-collapse/assets/index.css";
import Collapse from "rc-collapse";
var Panel = Collapse.Panel;

const assignmentListStyle = {
  margin: "20px"
};

class Assignments extends Component {
  componentDidMount() {
    this.props.actions.fetchAllAssignments(this.props.selectedCourse);
  }

  render() {
    if (this.props.loading) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    // If there are no assignments
    if(!this.props.assignments){
      return(
        <div>
          <h2>Assignments</h2>
          <RaisedButton
            label="Create Assignment"
            containerElement={<Link to={`/dashboard/create-assignment`} />}
          />
          <h2> No assignments in this course. Add one! </h2>
        </div>
      );
    }

    const assignmentList = this.props.assignments.map((assignment) => {
      return <div> hello </div>;
    });

    return (
      <div>
        <h1>
          {this.props.selectedCourse}
        </h1>
        <h2>Assignments</h2>
        <RaisedButton
          label="Create Assignment"
          containerElement={<Link to={`/dashboard/create-assignment`} />}
        />
        {/*{this.props.assignments.map(this.renderAssignmentList)}*/}
        <Collapse accordion={true} style={assignmentListStyle}>
        </Collapse>
         {assignmentList}
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
