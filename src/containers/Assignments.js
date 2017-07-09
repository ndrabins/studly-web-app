import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from "react-router-dom";

import map from "lodash/map";

import RaisedButton from "material-ui/RaisedButton";

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
          {Object.keys(this.props.assignments).map(key => {
            return (
                <Panel key={key} header={this.props.assignments[key].assignmentTitle} headerClass="my-header-class">
                  {this.props.assignments[key].description}
                  {this.props.assignments[key].dueDate}
                </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assignments: state.assignments.data,
    selectedCourse: state.courses.selectedCourse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
