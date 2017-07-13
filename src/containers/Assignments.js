import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from "react-router-dom";

import Map from "lodash/map";

import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";

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

  assignmentList() {
    const assignmentList = Map(this.props.assignments, (assignment, key) => {
      return (
        <Panel
          key={key}
          header={assignment.assignmentTitle}
          headerClass="my-header-class"
        >
          {assignment.description}

          {/*<RaisedButton label="Create Assignment" />*/}
        </Panel>
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
        <div style={{display: "flex", justifyContent:"center", flexDirection:"column", alignItems:"center" }}>
          <h2>Assignments</h2>
          <RaisedButton
            label="Create Assignment"
            containerElement={<Link to={`/dashboard/create-assignment`} />}
          />
        </div>
        <Collapse accordion={true} style={assignmentListStyle}>
          {this.assignmentList()}
        </Collapse>
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
